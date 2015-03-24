## Steps to reproduce bug:


A very strange bug, that return on aggregation 2 values instead of only one.

To see it, please run the script, that will import data to your local mongodb database and run the aggregation query over it.

    $ sh/run



## Result

    {
      "_id" : {
        "dimensions" : {
          "class_name" : "Market",
          "name" : "Slovak Republic"
        }
      },
      "dates" : [
        ISODate("2013-03-01T00:00:00Z"),
        ISODate("2013-12-01T00:00:00Z"),
        ISODate("2013-09-01T00:00:00Z"),
        ISODate("2013-07-01T00:00:00Z"),
        ISODate("2013-05-01T00:00:00Z"),
        ISODate("2013-08-01T00:00:00Z"),
        ISODate("2013-04-01T00:00:00Z"),
        ISODate("2015-04-01T00:00:00Z"),
        ISODate("2014-01-01T00:00:00Z"),
        ISODate("2013-01-01T00:00:00Z"),
        ISODate("2015-03-01T00:00:00Z"),
        ISODate("2014-03-01T00:00:00Z"),
        ISODate("2013-02-01T00:00:00Z"),
        ISODate("2013-10-01T00:00:00Z"),
        ISODate("2014-05-01T00:00:00Z"),
        ISODate("2013-06-01T00:00:00Z"),
        ISODate("2014-12-01T00:00:00Z"),
        ISODate("2013-11-01T00:00:00Z"),
        ISODate("2014-06-01T00:00:00Z"),
        ISODate("2015-05-01T00:00:00Z"),
        ISODate("2014-07-01T00:00:00Z"),
        ISODate("2014-09-01T00:00:00Z"),
        ISODate("2014-11-01T00:00:00Z"),
        ISODate("2015-01-01T00:00:00Z"),
        ISODate("2014-10-01T00:00:00Z"),
        ISODate("2014-02-01T00:00:00Z"),
        ISODate("2014-08-01T00:00:00Z"),
        ISODate("2015-06-01T00:00:00Z"),
        ISODate("2015-02-01T00:00:00Z"),
        ISODate("2014-04-01T00:00:00Z")
      ],
      "value" : 6779898
    }
    {
      "_id" : {
        "dimensions" : {
          "name" : "Slovak Republic",
          "class_name" : "Market"
        }
      },
      "dates" : [
        ISODate("2014-05-01T00:00:00Z"),
        ISODate("2014-09-01T00:00:00Z"),
        ISODate("2015-02-01T00:00:00Z"),
        ISODate("2013-11-01T00:00:00Z"),
        ISODate("2014-06-01T00:00:00Z"),
        ISODate("2015-05-01T00:00:00Z"),
        ISODate("2014-07-01T00:00:00Z"),
        ISODate("2014-11-01T00:00:00Z"),
        ISODate("2015-01-01T00:00:00Z"),
        ISODate("2013-04-01T00:00:00Z"),
        ISODate("2015-04-01T00:00:00Z"),
        ISODate("2013-07-01T00:00:00Z"),
        ISODate("2013-05-01T00:00:00Z"),
        ISODate("2013-09-01T00:00:00Z"),
        ISODate("2014-04-01T00:00:00Z"),
        ISODate("2014-08-01T00:00:00Z"),
        ISODate("2015-03-01T00:00:00Z"),
        ISODate("2013-10-01T00:00:00Z")
      ],
      "value" : 1070590
    }


    ...
    { "_id" : ObjectId("5511d792a2b63b1980796fd4"), "value" : 97957, "date" : ISODate("2015-06-01T00:00:00Z"), "dimensions" : [ { "class_name" : "Market", "name" : "Slovak Republic" }, { "class_name" : "Brand", "name" : "Brand3" } ], "cweek" : 23, "iso_year" : 2015, "year" : 2015, "month" : 6, "quarter" : 2, "day" : 1, "day_of_year" : 152, "day_of_week" : 1 }
    { "_id" : ObjectId("5511d792a2b63b1980796fd5"), "value" : 47327, "date" : ISODate("2013-01-01T00:00:00Z"), "dimensions" : [ { "name" : "Slovak Republic", "class_name" : "Market" }, { "class_name" : "Brand", "name" : "Brand4 " } ], "cweek" : 1, "iso_year" : 2013, "year" : 2013, "month" : 1, "quarter" : 1, "day" : 1, "day_of_year" : 1, "day_of_week" : 2 }