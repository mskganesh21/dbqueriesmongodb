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


//group by nested fields
db.personscollection.aggregate({"$group": {_id: "$company.location.country"})

