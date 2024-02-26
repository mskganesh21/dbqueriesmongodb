//document based db

// mongo shell

/*
is used to do crud operations of mongo server
basically management of mongo server
can connect to remote mongodb server and do crud operations
mongosh --host your_remote_host --port your_remote_port --username your_username --password your_password --authenticationDatabase admin


*/

//mongo server

/*
is used to store data in dbs and collections
*/

//mongod -version to check version 6.0.4

// mongosh version 1.7.0

// atlas
// having a cluster and online server to store data

// JSON BSON AND EXTENDED JSON

//key value pairs separated by comma. they are usually string objects
//data is just a string, the ojbect is a string

// 6 data types allowed string, number,object, array, boolean, null


// json is a string
// js object is variable type
// in json we use "" for double quotes
//in js objects we don't need "" for keys

// json to js object we use json.parse

//js object to json we use stringify

//BSON FORMAT

//binary json

// bson supports many data types

//extended json

// used to represent bson type data in json format to make it readable for humans

//32 bit integer is NUmberINt(150)

// ojbectId is objectId("dfdfdf211f15d3f")

// data is isoDate("2018")


// CRATE db

use "dbname"


// crete collections

db.createCollection("name")


// insertion of documents

db.posts.insertOne({})

db.posts.insertMany([{}, {}, {}])

// find documents

db.posts.find({query})

db.posts.findOne({query})


//skip limit sort


db.posts.find({}).skip(2)

db.posts.find({}).limit(2)

db.posts.find({}).sort({"comments": -1})


//UPDATE operations

db.posts.updateOne()

db.posts.updateMany()

//first update operators



//MONGODB UPDATE OPERATORS

//SET RENAME UNSET CURRENTDATE INC ADDTOSET

db.getCollection("posts").updateOne({"postId": 2618},
 {"$set": {"shared" : true}})


db.posts.updateMany({})

//DELETE

db.posts.deleteOne({query})

db.posts.deleteMany({query})


// indexes

// utilities

// replica sets

// mongodb dreivers for nodejs










