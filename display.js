var express = require('express');
var app = express();
var session=require('express-session');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Kcc98:Kcc981014@cem304-bfaow.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/views/index.ejs'); 
})
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    try{
        MongoClient.connect(uri, function(err, client){
            if(err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
           }else{
            var collection = client.db("GameDB").collection("Game");
            try{
                collection.find().toArray((err, result) => {
                        if (err) return console.log(err)
                        // renders index.ejs
                        res.render('index.ejs', {game: result})
                      })
            }catch(ex){
                throw new Error(ex.toString());
            }
            } 
        });
    }catch(ex){
        throw new Error(ex.toString());
    }
  })

var server = app.listen(3002, function () {
    console.log('Node server is running..');
});