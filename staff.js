var express = require('express');
var app = express();
var session=require('express-session');
var path = require('path');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Kcc98:Kcc981014@cem304-bfaow.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });

/*const conn=MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }else{
       var collection = client.db("Staff").collection("Staff");
        console.log('Connected...');
        client.close();
    }

    // perform actions on the collection object
    
 });*/
//var mongodb = require('mongodb');
//var dbConn = mongodb.MongoClient.connect(uri);
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('staffIndex'); 
})
app.post('/logout',function(req,res){
    res.redirect('/'); 
})
/*app.post('/viewdata',function(req,res){
    res.render('staffDisplay'); 
})*/
app.post('/backMan',function(req,res){
    res.render('manage'); 
})
app.get('/logout',function(req,res){
    res.render('staffIndex'); 
})
//staff login
app.post('/staff-login', function (req, res){
    try{
        MongoClient.connect(uri, function(err, client){
            if(err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
           }else{
            var collection = client.db("GameDB").collection("Staff");
            try{
                collection.findOne({sId:req.body.sId},(function(err,items){
                    if(items == null){ 
                        res.redirect('/');
                        console.log("login not sucess");
                    }else if(items.sId === req.body.sId){
                        res.render('manage');
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

//add game function
app.post('/add-game', function (req, res) {
try{
    MongoClient.connect(uri, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }else{
           var collection = client.db("GameDB").collection("Game");
           collection.insert(req.body);
           res.sendFile(__dirname+'/addSuccess.html');
           console.log('add');
           client.close();
        }
        // perform actions on the collection object
        
     });
}catch(ex){
    throw new Error(ex.toString());
}
   // res.send('Data received:\n' + JSON.stringify(req.body));
});

//delete function
app.post('/delete-game', function (req, res) {
    try{
        MongoClient.connect(uri, function(err, client) {
            if(err) {
                 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            }else{
               var collection = client.db("GameDB").collection("Game");
               collection.remove({gName:req.body.gName},{w:1});
               res.sendFile(__dirname+'/deleteSuccess.html');
               console.log('Document Removed Successfully!');
                client.close();
            }
        
            // perform actions on the collection object
            
         });
    }catch(ex){
        throw new Error(ex.toString());
    }
       // res.send('Data received:\n' + JSON.stringify(req.body));
    });

    app.post('/edit-game', function (req, res) {
        try{
            MongoClient.connect(uri, function(err, client) {
                if(err) {
                     console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
                }else{
                   var collection = client.db("GameDB").collection("Game");
                   collection.update({gName:req.body.gName},{$set:{gDesc:req.body.gDesc}},{w:1});
                   res.sendFile(__dirname+'/editSuccess.html');
                   console.log('updated');
                   client.close();
                }
            
                // perform actions on the collection object
                
             });
        }catch(ex){
            throw new Error(ex.toString());
        }
           // res.send('Data received:\n' + JSON.stringify(req.body));
        });

//find data
app.post('/viewdata', function (req, res) {
    res.render('staffDisplay');
    try{
        MongoClient.connect(uri, function(err, client) {
            if(err) {
                 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            }else{
               var game=[];
               var collection = client.db("GameDB").collection("Game");
               var result = collection.find();

               result.forEach(function(error,doc){
                   if(error){
                       console.log(error);
                   }else{
                       if(doc != null){
                           game.push(doc);
                       }else{
                           console.log(game);
                           //res.render({game:game})
                       }
                   }
               })

               console.log('show');
                client.close();
            }
        
            // perform actions on the collection object
            
         });
    }catch(ex){
        throw new Error(ex.toString());
    }
       // res.send('Data received:\n' + JSON.stringify(req.body));
    });       

var server = app.listen(3001, function () {
    console.log('Node server is running..');
});