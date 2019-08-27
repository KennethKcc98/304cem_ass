var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Kcc98:Kcc981014@cem304-bfaow.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });

const conn=MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }else{
       var collection = client.db("Staff").collection("Staff");
        console.log('Connected...');
        client.close();
    }

    // perform actions on the collection object
    
 });
//var mongodb = require('mongodb');
//var dbConn = mongodb.MongoClient.connect(uri);

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html'); 
})
app.post('/staff-login', function (req, res){
    try{
        MongoClient.connect(uri, function(err, client){
            if(err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
           }else{
            var collection = client.db("Staff").collection("Staff");
            try{
                collection.findOne({sId:req.body.sId},(function(err,items){
                    if(items == null){ 
                        res.send("Login invalid");
                        console.log("login not sucess");
                    }else if(items.sId === req.body.sId){
                        res.sendFile(__dirname+'/manage.html');
                        console.log("login sucess");
                    }
                    //console.log(items);
                    }))
            }catch(ex){
                throw new Error(ex.toString());
            }
            } 
        });
    }catch(ex){
        throw new Error(ex.toString());
    }
});
/*app.post('/submit-student-data', function (req, res) {

try{
    MongoClient.connect(uri, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }else{
           var collection = client.db("Staff").collection("Staff");
           collection.insert(req.body);
           console.log('add');
            client.close();
        }
    
        // perform actions on the collection object
        
     });
}catch(ex){
    throw new Error(ex.toString());
}
            
   
     
   // res.send('Data received:\n' + JSON.stringify(req.body));
});*/

var server = app.listen(3001, function () {
    console.log('Node server is running..');
});