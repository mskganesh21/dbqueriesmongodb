//AGGREGATION PIPELINE

// MATCH GROUP SORT SEND


//syntax
db.collection.aggregate([stage1,stage2,stage3, ...])


//empty array
db.personscollection.aggregate([]);
//returns same result as an array 

//AGGREGATION STAGES

// takes documents as input and gives us documents as output

// stages are independent

// stage operator
db.personscollection.aggreagate([{"$match": {"age": {"$gt": 20}}},
{"$group": {"_id": "$age"}}, 
{"$sort": {"count": -1}}
])

//stage operator
$match
$group
$project
$sort
$count
$limit
$skip
$out


//aggregation expression 

{"$group": {"_id": "$age"}}
{"$group": {"_id": "$company.location.country"}}
{"$group": {"_id": "$name", "total": {"$sum": "$price"}}}


//MATCH STAGE 
//match is similar to find with the query

{"$match": {"city": "New York"}}
{"$match": {"age": {"$gt": 25}}}
{"$match": {"$and": [{"gender": "female"}, {age: {"$gt": 25}}]}}


 db.personscollection.aggregate([{"$match": {"age": {"$gt": 25}}}])

db.personscollection.aggregate([{"$match": {"tags": {"$size": 3}}}])



//GROUP STAGE
//used in every request
//_id should always be there it is important

{"$group": {_id: "$age"}}

{"$group": {_id: {"age": "$age", "gender": "$gender"}}}

{"$group": {_id: "$gender"}}


// group by multiple fields

db.personscollection.aggregate([{"$group": {_id: {"age": "$age", "gender" : "$gender"}}}])

db.personscollection.aggregate([{"$group": {_id: {"eyecolor": "$eyeColor", "favoriteFruit": "$favoriteFruit"}}}])


db.personscollection.aggregate([{"$group": {_id: {"eyecolor": "$eyeColor", "favoriteFruit": "$favoriteFruit", "age": "$age"}}}])  


//MATCH AND GROUP STAGE

db.personscollection.aggregate([{"$match": {"favoriteFruit": "banana"}}, 
{"$group": {_id: {"age": "$age", "eyeColor": "$eyeColor"}}}
])


db.personscollection.aggregate([{ "$match": { "gender": "female" } }, { "$group": { _id: { "age": "$age", "eyeColor": "$eyeColor" } } }])

// if we change the order i.e. group and then match it doesn't work


// we can also group and match but only fields available after group is done can be matched 

db.personscollection.aggregate([{"$group": {_id: {"age": "$age", "eyeColor": "$eyeColor"}}},{"$match": {"_id.age": {"$gt": 30}}}])  



// $COUNT OPERATOR STAGE

//count is also the last one in the STAGE

{"$count": "title"}
{"$count": "countries"}

db.personscollection.aggregate([{"$count": "allDocumentsCount"}])

db.personscollection.aggregate([{"$group": {_id: {"age": "$age", "eyeColor": "$eyeColor"}}},{"$match": {"_id.age": {"$gt": 30}}}, {"$count": "alldocumentscount"}])


//DIFFRENT COUNT METHODS

db.personscollection.aggregate([]).toArray().length;

 db.personscollection.aggregate([]).itcount()
 
  db.personscollection.aggregate([{"$count": "Total"}])


db.personscollection.aggregate([{"$group": {_id: "$company.location.country"}},{"$count": "countriesCount"}])


db.personscollection.aggregate([{"$group": {_id: "$age"}},{"$count": "agesCount"}])

 db.personscollection.aggregate([{"$group": {_id: {"eyeColor": "$eyeColor", "gender": "$gender"}}},{"$count": "agesCount"}])
 
 db.personscollection.aggregate([{"$group": {_id: {"eyeColor": "$eyeColor", "age": "$age"}}},{"$count": "noofagesgroupwithdifferenteyecolors"}])
 
db.personscollection.aggregate([{"$match": {"age" : {"$gte": 25}}},{"$group": {_id: {"eyeColor": "$eyeColor", "age": "$age"}}},{"$count": "noofagesgroupwithdifferenteyecolors"}])


//SORT STAGE 

{"$sort": {"score": -1}}


{"$sort": {"score": 1, "country": 1}}


db.personscollection.aggregate([{"$match": {"age" : {"$gte": 25}}},{"$group": {_id: {"eyeColor": "$eyeColor", "age": "$age"}}},{"$sort": {"age": -1}}])

db.personscollection.aggregate([{"$sort": {"name": 1}}])

db.personscollection.aggregate([{"$sort": {"age": 1}}])

 db.personscollection.aggregate([{"$sort": {"age": 1, "gender": -1, "eyeColor": 1}}])
 
 
db.personscollection.aggregate([{"$group": {_id: "$favoriteFruit"}}, {"$sort": {_id: 1}}])


db.personscollection.aggregate([{"$group": {_id: {"eyecolor": "$eyeColor", "favoriteFruit": "$favoriteFruit"}}}, {"$sort": {"_id.favoriteFruit": 1}}])


//PROJECTION STAGE

// 1 includes 0 don't include

{"$project": {"key1": 1, "key2" : 0, "key3": expression}}

{"$project": {"name": 1, "company.title": 0}}

 db.personscollection.aggregate([{"$project": {"name": 1, "newAge": "$age", "_id": 0}}])
 
 db.personscollection.aggregate([{"$project": {"name": 1, "company.location.country": 1, "_id": 0}}])
 
  db.personscollection.aggregate([{"$project": {"name": 1, "gender": 1,"isActive": 1, "_id": 0}}, {"$count": "totalcount"}])
  
  
  //PROJECT GOES AFTER MATCH STAGE
  
  //PROJECT CAN BE USED TO RENAME WITH NEW FIELDS
  
   db.personscollection.aggregate([{"$project": {"name": 1, "_id": 0, "info": {"eyes": "$eyeColor", "fruit": "$favoriteFruit", "country": "$company.location.country"}}}])


//LIMIT STAGE

{"$limit": 100}

 db.personscollection.aggregate([{"$limit":3}])
 
 db.personscollection.aggregate([{"$limit":100}, {"$match": {"age": {"$gt":27 }}}, {"$group":{ _id: "$company.location.country"}}]) 
 
 db.personscollection.aggregate([{"$limit":100}, {"$match": {"eyeColor": {"$ne": "blue" }}}, {"$group":{ _id: {"eyes": "$eyeColor", "favoriteFruit": "$favoriteFruit"}}}, {"$sort": {"_id.eyes": 1, "_id.favoriteFruit": -1}}])



//ARRAYS AGGREGRATION OPERATIONS
//UNWIND OPERATION STAGE

{"$unwind": "$tags"}

//example: suppose if we have a document which has an array of hobbies
// if we use unwind operation then we'll get no of documents equal to the number of hobbies
//if we have 3 hobbies we'll get 3 documents

db.personscollection.aggregate([{"$unwind": "$tags"}, {"$count": "totalafterunwindoperation"}])

//unwind is usually used with group and projection STAGE

db.personscollection.aggregate([{"$unwind": "$tags"}, {"$project": {"name": 1, "gender": 1, "tags": 1} }])


//unwind with group STAGE

 
db.personscollection.aggregate([{"$unwind": "$tags"}, {"$group": {_id: "$tags"}}])

//MONGODB AGGREGATION FRAMEWORK
//ACCUMULATORS
//SUM AVG MAX MIN

//USED IN GROUP STAGE


{"$group": {"$sum": "$quantity"}}

//SUM OPERATOR

{"total": {"$sum": "$quantity"}}

{"count": {"$sum": 1}}

db.personscollection.aggregate([{"$group": {_id: "$age", "count": {"$sum": 1}}}])

db.personscollection.aggregate([{"$group": {_id: "$favoriteFruit", "count": {"$sum": 1}}}])

db.personscollection.aggregate([{"$unwind": "$tags"},{"$group": {_id: "$tags", "count": {"$sum": 1}}}])


//AVG OPERATOR

// we are grouping by eyecolor and finding avg age of persons
db.personscollection.aggregate([{"$group": {_id: "$eyeColor", "avgAge": {"$avg": "$age"}}}])

db.personscollection.aggregate([{"$group": {_id: "$favoriteFruit", "avgAge": {"$avg": "$age"}}}])

db.personscollection.aggregate([{"$group": {_id: "$company.location.country", "avgAge": {"$avg": "$age"}}}])


//UNARY OPERATORS

//UNARY ARE USED IN PROJECT STAGE

// IN GROUP STAGE UNARY CAN BE USED ONLY IN CONJUNCTION WITH ACCUMULATORS

// TYPE OR LT GT AND MULTIPLY

//TYPE UNARY OPERATOR

//RETURNS BSON TYPE OF FIELD


db.personscollection.aggregate([{"$project":{"name": 1, "eyeColorType": {"$type": "$eyeColor"}, "ageType": {"$type": "$age"}}}])    

db.personscollection.aggregate([{"$project": {"name": 1, "nameType": {"$type": "$name"},"ageType": {"$type": "$age"},"tagsType": {"$type": "$tags"},"companyType": {"$type": "$company"}}}]) 



//OUT STAGE

//OUT STAGE IS WRITING RESULTING DOCUMENTS TO THE NEW MONGODB personscollection

{"$out": "newCollection"}

// must be the last stage 


db.personscollection.aggregate([{"$project": {"name": 1, "nameType": {"$type": "$name"},"ageType": {"$type": "$age"},"tagsType": {"$type": "$tags"},"companyType": {"$type": "$company"}}}, {"$out": "outCollection"}])



db.personscollection.aggregate([{"$group": {_id: {"age": "$age", "eyeColor": "$eyeColor"}}}, {"$out": "aggregatedResults"}])



//ALL DISK USE OPTION

// all aggreation stages can use max 100mb of ram

// now we can use alldiskuse: true to store data in each stage in temporary files


db.personscollection.aggregate([], {allowDiskUse: true})


