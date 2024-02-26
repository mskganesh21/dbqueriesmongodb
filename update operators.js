//MONGODB UPDATE OPERATORS

// update, updateOne, updateMany, replaceOne

//db.collection.update({query}, {updatedata}, {options})

// set OPERATORS

{"$set": {"key": "value"}}

db.shoppingcart.update({"index": 3}, {"$set": {
  cartId: NumberInt(325),
  customer: {
    name: "mike foster", 
    email: "mfoster@test.com",
    age: NumberInt(27)
  }, 
  cart: []
}})


//UNSET OPERATOR 

//remove certain fields

db.shoppingcart.update({"index": 4}, {"$unset": {"key": "providesomedummyvalueusually 1"}})


db.shoppingcart.update({"index": 1}, {"$unset": {"customer": 1}})

db.shoppingcart.update({"index": 1}, {"$unset": {"customer.name": 1}})

// update by default updates only 1 document

db.shoppingcart.update({}, {}, {"multi": true})


//UPDATE UPDATEone

db.shoppingcart.updateOne({}, {}, {})

db.shoppingcart.updateMany({}, {}, {})

db.shoppingcart.updateMany({"cart": {"$exists": false}}, {"$set": {"cart": []}})


// replace one method

db.shoppingcart.replaceOne({index: 1}, {"index": 1, "processed": false, "cart": []})


// combining multiple update OPERATORS

db.shoppingcart.update({index: 1}, {
  "$set": {
    cartId: NumberInt(435), 
    "customer.name": "Samanta Larsen", 
    "customer.email": "slarsen@test.com"
  }, "$unset": {
    newOrder: 1
  }
})


//RENAME OPERATORS
//rename the field name

db.shoppingcart.update({cartId: {$exists: true}}, {
  "$rename": {
    cartId: "orderId", 
    anotherField: "anothername"
  }
}, {multi: true})


// CURRENT DATE

//created at , updatedAt

db.shoppingcart.update({cartId: 325}, {"$currentDate": {
  createdAt: true
}})

db.shoppingcart.updateMany({updateAt: {$exists: false}}, {
  $currentDate: {updateAt: true}
})

//array update OPERATORS

//$, push , pull, addtoSet pullall, pop



