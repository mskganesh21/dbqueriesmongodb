// mongodb delete operations 

// delete documents
//delete collection
//delete databases

//delete documents

remove(), deleteOne(), deleteMany()

//remove

db.collection.remove(query)

//this removes only one document
db.collection.remove(query, true)

//this empties the whole collection 
db.collection.remove({})

//deleteOne

db.collection.deleteOne(query)

//empty query deletes one document 
db.collection.deleteOne({})


//deleteMany

//all documents will get deleted
db.collection.deleteMany({})

db.collection.deleteMany({_id: {$ne: OBjectId("dff5gs6g4g")}})


// delete collection 

db.collection.drop()

// drop database

db.dropDatabase()











