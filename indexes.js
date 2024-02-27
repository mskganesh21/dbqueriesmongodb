// MONGODB INDEXES

// indexes imporve query execution

// collection scan and index scan

//b - tree 
/*
          25
          
    22           27
    
19 23 24     26 30 35 
*/


// default index is _id: 1 

//name of Index :  _id_

// get indexes

db.collection.getIndexes()

// when to create index

/*
when are using the same query to get the data many times then we can use that field
and then set the index there and then use that to get data
*/

//create index

db.collection.createIndex({age: 1})
db.collection.createIndex({name: -1})

// options

{background: true}
/*
if the data is live and crud operations are being performed and we don't
want to  stop the db then we can use background to true
*/

{unique: true}
/*
create unique index
*/

{name: "indexname"}

/*
setting custom name for the index
*/

// explan method

db.collection.explain().find({age : 27})

db.collection.explain("executionStats").find({age: 27})

// delete index

db.collection.dropIndex({"age": 1})

db.collection.dropIndexes()

