function wrapper(opts) {
    var db_name                 = opts.db_name;
    var import_collection_name  = opts.import_collection_name
    var allowed_dimension_types = opts.allowed_dimension_types
    var allowed_kpi_collections = opts.allowed_kpi_collections
    var log_file = []

    var log = function(msg){
        log_file.push(msg)
    }

    var context = {}

    context.deleteMatchingFacts = function(bulk, start_date, end_date){
       bulk.find({ date: {$gte: start_date,$lte: end_date} }).remove()
    }

    /*
       Prepares Bulk operation for each facts collection to
       move facts from imports collection to actual collection

       @return  {Hash}
          - collection_name {String}
          - count           {Integer}

    */
    context.migrateFromTempCollection = function(collection_name, start_date, end_date) {
        print('Migrating ', collection_name)


        var temp_collection = db[import_collection_name];
        var bulk            = db[collection_name].initializeOrderedBulkOp();
        var count           = 0;

        // make should target collection does not have matching documents
        context.deleteMatchingFacts(bulk, start_date, end_date)

        temp_collection.find({type: collection_name}).forEach(function(doc) {
            // remove type field
            delete(doc['type']);
            delete(doc['_id']);
            bulk.insert(doc);
            count += 1;
        })
        bulk.execute();
        print('Imported ', count, ' facts')
        return {
            collection_name: collection_name,
            count: count,
        }
    }

    /*
       Execute migration for each Fact type in import collection

       @return
         result {Array} - array with results for each single fact type
    */

    context.runScript = function() {
        // this sets global DB!
        db          = db.getSiblingDB(db_name)
        var tmp_col = db[import_collection_name]

        // ensure index, otherwise might blow up!
        tmp_col.createIndex({
            date: 1
        })

        // all possible collections (aka KPI names) in tmp_col
        var kpi_types = tmp_col.distinct('type')
        var start_doc = tmp_col.find().sort({date: 1})[0]
        var end_doc   = tmp_col.find().sort({date: -1})[0]

        if(start_doc && end_doc){
            var start_date = start_doc && start_doc.date
            var end_date   = end_doc   && end_doc.date

            var result = kpi_types.map(function(collection_name) {
                return context.migrateFromTempCollection(collection_name, start_date, end_date)
            });
            return result;
        }
    }

    return context.runScript()
}
