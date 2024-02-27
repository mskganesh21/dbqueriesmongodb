//MONGODB UTILITIES

// mongodbexport and mongodbimport

//mongodump and mongorestore

// mongostat and mongotop

//mongodbexport

//exports data in json or csv format


mongoexport --db queriespracticedb --collection personscollection --out persons.json

//mongoimport utility

//import data in csv or json format

mongodimport --db myDb --collection personsImport --file persons.json

//mongodump

// export in binary format

mongodump --db myDb 

// mongorestore

// binary import of mongodb backup
//indexes will be re-created

mongorestore 


//mongostat

//mongodb real time perfomance statistics

mongostat

//mongotop

//top current read and write operations

mongotop 

mongotop 180
