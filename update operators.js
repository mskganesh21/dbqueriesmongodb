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


// array update methods

//$ $push $pull $addToSet $pull $pullAll $pop

//$push

{"$push": {"key": "element"}}

db.collection.update({cartId: 561}, {"$push": {"cart": "item1"}})

 db.shoppingcart.update({"cartId": 325}, {"$push": {"cart": "item1"}})

//each can add multiple elements once
db.shoppingcart.update({"cartId": 325}, {"$push": {"cart" : {"$each" : ["item2", "item3"]}}})

// if we are using push and array is not present then new array will be created

//ADD TO SET OPERATOR 
//prevents duplicate elements to be added to the array 


db.shoppingcart.update({cartId: 561}, {"$addToSet": {"cart": "item1"}})


db.shoppingcart.update({cartId: 561}, {"$addToSet": {"cart": {"$each": ["item2", "item3"]}}})



//POP OPERATOR
// remove the first/last element of the array
// 1 last element is deleted
//-1 then first element is deleted
//  if only 1 element is preseent, then the element will be deleted and array will be preseent


db.shoppingcart.update({cartId : 561}, {"$pop": {"cart": 1}})


db.shoppingcart.update({index : 1}, {"$pop": {"cart": 1}})

//$pull

//remove selected element from the array or by condition

db.shoppingcart.update({index: 1}, {"$pull": {"cart" : "item1"}})

db.shoppingcart.update({index: 1}, {"$pull": {"cart" : {$gt: 400}}})

//$pullAll

// we have to specify the elements we need to remove in an array format and then we can remove it

db.shoppingcart.update({index: 1}, {"$pullAll": {"cart": ["item1", "item2"]}})

db.shoppingcart.update({index: 1}, {"$pull": {"cart": {"$in": ["item1", "item2"]}}})


//positional operator $ operator

{"$set": {"key.$" : "value"}}

{"$set": {"key.$.field" : "value"}}

db.shoppingcart.updateOne({cartId: 1, cart: "item2"}, {"$set": {
  "cart.$": "updatedItem2"
}})

db.shoppingcart.updateOne({index: 1, cart: "item3"}, {"$unset": {"cart.$": 1}})


// arrays with nested documents

//without elemeMatch operator

{cart: [{title: "TV", price: NumberInt(340), quantity : NumberInt(2)}, {title: "Phone", price: NumberInt(340), quantity : NumberInt(2)}]}

db.shoppingcart.updateOne({"cart.title": "Phone"}, {
  "$set": {
    "cart.$.quantity": NumberInt(2)
  }
})

db.shoppingcart.updateOne(
  { "cartId": 456, "cart.title": "TV" },
  { 
    "$set": {
      "cart.$.price": NumberInt(300),
      "cart.$.quantity": NumberInt(10)
    }
  }
)

db.shoppingcart.updateOne({cart: {"$elemMatch": {title: "Phone", quantity: 4}}}, {"$set": {"cart.$.price": NumberInt(129)}})
















