## Steps to reproduce bug:


A very strange bug, that return on aggregation 2 values instead of only one.

To see it, please run the script, that will import data to your local mongodb database and run the aggregation query over it.

    $ sh/run



## Possible Results (randomly you might get any of the following 2 variations)


### Bad one

    {
      "_id" : {
        "dimensions" : {
          "class_name" : "Market",
          "name" : "Slovak Republic"
        }
      },
      "dates" : [
        ISODate("2015-06-01T00:00:00Z")
      ],
      "value" : 97957
    }
    {
      "_id" : {
        "dimensions" : {
          "name" : "Slovak Republic",
          "class_name" : "Market"
        }
      },
      "dates" : [
        ISODate("2013-01-01T00:00:00Z")
      ],
      "value" : 47327
    }


### Good one

    {
      "_id" : {
        "dimensions" : {
          "class_name" : "Market",
          "name" : "Slovak Republic"
        }
      },
      "dates" : [
        ISODate("2015-06-01T00:00:00Z"),
        ISODate("2013-01-01T00:00:00Z")
      ],
      "value" : 145284
    }






#### Solution (or workaround) would be to force the order for object fields directly in the $group(aggregation) condition, e.g:

    ...
    "$group": {
        "_id": {"dimensions": {
          "class_name": "$dimensions.class_name",
          "name":       "$dimensions.name",
        }},
        "dates": {"$addToSet": "$date"},
        "value": {"$sum": "$value"}
     }
     ...

    ## AFTER WORKAROUND ##
    connecting to: aggregation_bug
    {
      "_id" : {
        "dimensions" : {
          "class_name" : "Market",
          "name" : "Slovak Republic"
        }
      },
      "dates" : [
        ISODate("2015-06-01T00:00:00Z")
      ],
      "value" : 97957
    }
    {
      "_id" : {
        "dimensions" : {
          "name" : "Slovak Republic",
          "class_name" : "Market"
        }
      },
      "dates" : [
        ISODate("2013-01-01T00:00:00Z")
      ],
      "value" : 47327
    }
    **** a workaround to force the order for object fields directly in the $group(aggregation) condition, e.g:

    MongoDB shell version: 3.0.1
    connecting to: aggregation_bug
    {
      "_id" : {
        "dimensions" : {
          "class_name" : "Market",
          "name" : "Slovak Republic"
        }
      },
      "dates" : [
        ISODate("2013-01-01T00:00:00Z"),
        ISODate("2015-06-01T00:00:00Z")
      ],
      "value" : 145284
    }
