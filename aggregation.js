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


















