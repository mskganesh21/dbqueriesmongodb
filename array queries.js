// QUERYING ARRAYS

//array contains certain value

db.collection.find({"key": value})

db.restaurants.find({"grades.score": 11})

//specific index in array has certain value

db.collection.find({"key.index": value})

db.restaurants.find({"grades.0.score": 11})



//$all operation
// returns arrays with all values, independent of order

db.collection.find({"key": {"$all": ["value1", "value2"]}})

db.restaurants.find({"grades.score": {"$all": [13,11]}})


//$size
// returns documents which have arrays of size mentioned

db.collection.find({"key": {"$size": 4}})


// QUERYING NESTED OBJECTS OF arrays

db.collection.find({"friends.name": "Lora"})

db.collection.find({"friends": {"name": "Lora", "age": 23}})
//if you use the above query then order should be be strictly same


//$elemMatch
// atLeast one nested document in the array must match all conditions. Order of conditions doesn't matter.

db.collection.find({"key": {"$elemMatch": {query1,query2}}})

db.collection.find({"results": {"$elemMatch": {"$gt": 80, $lt: 90}}})

db.collection.find({"results": {"$elemMatch": {"product": "xyz", "score": {$gte: 8}}}})

db.collection.find({friends: {$elemMatch: {name: "Bob", registered: false}}})

db.collection.find({friends: {$elemMatch: {age: 25, registered: false}}})

db.collection.find({friends: {$elemMatch: {age: 25, "name": "John" }}})
// in this query if the age in the object which contains name as john is not 25 then there there will be no output
