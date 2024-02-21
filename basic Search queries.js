/*
mongodb queries tutorial or queries 
*/

// SEARCH queries

//1.  EMPTY QUERY

db.collection.find({})
// this will return all the documents

db.collection.find({}).count()
// this will return the count of all documents

// 2. EQUALITY QUERIES

// for strings

db.collection.find({"key" : "value"})
//this is first way

db.collection.find({key: "value"})
// this is second way 


// for number/Boolean

db.collection.find({"key": value})
// value should be without quotes


//3. AND OPERATION 

db.collection.find({"key1": "value1", "key2": "value2"})


//4. OPERATORS

// GENERAL QUERY 

//this is for string queries
db.collection.find({"key": {"$operator": "value"}})

// this is for number/Boolean queries

db.collection.find({"key" : {"$operator": value}})


//COMPARISON OPERATORS

//$ne
// Matches all values that are not equal to a specified value.

db.collection.find({"key": {"$ne": "value"}})

db.collection.find({"favouriteFruit": {"$ne": "orange"}})


//$lt 
//Matches values that are less than a specified value.

db.collection.find({"key": {"$lt" : value}})

db.collection.find({"age" : {"$lt": 35}})


//$gt
//Matches values that are greater than a specified value.

db.collection.find({"key": {"$gt": value}})

db.collection.find({"age": {"$gt": 40}})


//$eq
//Matches values that are equal to  a specified value.

db.collection.find({"key": {"$eq": value}})

db.collection.find({"age": {"$eq": 40}})


//$gte
//Matches values that are greater than or equal to  a specified value.

db.collection.find({"key": {"$gt": value}})

db.collection.find({"age": {"$gt": 40}})


//$lte
//Matches values that are less than or equal to  a specified value.

db.collection.find({"key": {"$gt": value}})

db.collection.find({"age": {"$gt": 40}})


//$ne
//Matches values that are not equal to the  specified value.

db.collection.find({"key": {"$gt": value}})

db.collection.find({"age": {"$gt": 40}})





























