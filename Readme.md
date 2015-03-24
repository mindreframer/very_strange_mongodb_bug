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


