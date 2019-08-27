var MongoClient = require('mongodb').MongoClient;
//var sId = req.body.sId ;
 
/// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mymondb", function (err, db) {
  if(err) throw err;
  //Write databse Insert/Update/Query code here..
  db.collection('Staff',function(err,collection){
    collection.insert({ id:1001, firstName:'Steve', lastName:'Jobs' });
    collection.insert({ id:1002, firstName:'Bill', lastName:'Gates' });
    collection.insert({ id:1003, firstName:'James', lastName:'Bond' });
    collection.insert({ id:1004, firstName:'Kenneth', lastName:'Chan' });
    collection.insert({ id:1005, firstName:'Ben', lastName:'Lai' });

 
    collection.count(function(err,count){
        if(err) throw err;
        console.log('Total Rows:'+count);
    });
  });
  db.close(); 
});