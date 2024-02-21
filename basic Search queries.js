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

db.collection.find({"key": {"$ne": value}})

db.collection.find({"age": {"$ne": 40}})


//$in
//Matches any of the values specified in the array

db.collection.find({"key": {"$in": [value1,value2]}})

db.collection.find({"age": {"$in": [40,45]}})



//$nin
//Matches none of the values specified in the array

db.collection.find({"key": {"$nin": [value1,value2]}})

db.collection.find({"age": {"$nin": [40,45]}})


//DOES COMPARISON OPERATORS WORK WITH STRINGS?
// YES

db.collection.find({"name": {"$gt": "N"}})
// this returns all the documents with name starting from N
//mongodb is case sensitive
// instead use the regex operator

// comparison opeators can also be used for dates

db.collection.find({"registered": {"$lte": ISODate("2016-08-20T04:43:18.000Z")}})




//LOGICAL OPERATORS

//AND OPERATOR

//$and

// logically combines multiple conditions. resulting documents must match all documents

db.collection.find({$and: [{"key": {"$operator": "value"}}, {"key": {"$operator": "value"}}]})

db.restaurants.find({$and: [{"gender": "male"}, {"age": 25}]})

db.restaurants.find({$and: [{"age": {"$ne": 25}},{"age": {"$gte": 20}}]})


// let's look at an example 

db.restaurants.find({$and: [{"age": {"$ne": 25}}, {"age": {"$gte": 20}}]})
// this is the usage of correct and OPERATION

db.restaurants.find({"age": {"$ne": 25}, "age": {"$gte": 20}})
// this is also and but this should not be used because it isn't effective

// if you want to query different fields without using and operator that will give the correct result but if you want to query same parameters then use $and operator 



//OR operator

// logically combines multiple conditions. resulting documents match any of the conditions

db.collection.find({$or: [{"key": {"$operator": "value"}}, {"key": {"$operator": "value"}}]})

db.restaurants.find({$or: [{"gender": "male"}, {"age": 25}]})

db.restaurants.find({$or: [{"age": {"$ne": 25}},{"age": {"$gte": 20}}]})

db.restaurants.find({$or: [{"age": 20}, {"age": 25}]})
// the equivalent query for the above is 

// if you want to query same fields then use in operator
db.restaurants.find({"age": {"$in": [20,25]}})



//QUERY EMBEDDED documents

    "company": {
      "title": "YURTURE",
      "email": "aureliagonzales@yurture.com",
      "phone": "+1 (940) 501-3963",
      "location": {
        "country": "USA",
        "address": "694 Hewes Street"
      }
    },
    
  db.collection.find({"company.title": "SHEPARD"})
  
  db.collection.find({"company.location.address": "379 Tabor Court"})


//$not operator
// this returns the documents where the expression is valid

db.inventory.find({price: {$not: {"$gt": 1.99}}})
// this returns the documents where price is less than1.99 and also documents where price field does not exist


{ $not: { $gt: 1.99 } } is different from the $lte operator. { $lte: 1.99 } returns only the documents where price field exists 
and its value is less than or equal to 1.99.


//$nor
//$nor
 //performs a logical NOR operation on an array of one or more query expression and selects the documents that fail all the query expressions in the array.
 
 
 db.inventory.find({$nor: [{"price": 1.99},{"sale": true}]})
 
//This query will return all documents that:
/*
contain the price field whose value is not equal to 1.99 and contain the sale field whose value is not equal to true or

contain the price field whose value is not equal to 1.99 but do not contain the sale field or

do not contain the price field but contain the sale field whose value is not equal to true or

do not contain the price field and do not contain the sale field 
 */
 
// ELEMENT SELECTORS

//$exists

// When <boolean> is true, 
//$exists
// matches the documents that contain the field, including documents where the field value is null. If <boolean> is false, the query returns only the documents that do not contain the field


db.collection.find({key: {"$exists": true/false}})
 
db.collection.find({"key": {"$exists": true, "$in": [5,15]}})



//$type

/*
$type
 selects documents where the value of the field is an instance of the specified BSON type(s). Querying by data type is useful when dealing with highly unstructured data where data types are not predictable.
*/
 
 
 db.collection.find({"key": {"$type": "string/boolean/double/etc"}})
 
db.restaurants.find({"address.zipcode": {"$type": "string"}})







