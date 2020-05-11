// https://zellwk.com/blog/crud-express-mongodb/
const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
const bodyParser = require('body-parser');

// ejs template engine
app.set('view engine', 'ejs');

// The urlencoded method within body-parser tells body-parser
// to extract data from the <form> element and add them to the
// body property in the request object.
app.use(bodyParser.urlencoded({extended: true}));
// server
app.listen(port, ()=> console.log('Running on 4000'));
app.use(express.static('public'));

// mongodb
const MongoClient = require('mongodb').MongoClient;
const mongopass = process.env.MONGOPASS;
const connectionString='mongodb+srv://yoda:'+mongopass+'@cluster0-3uy96.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(connectionString, {useUnifiedTopology: true})
    .then((client) => {
      console.log('Connected to Database');
      // create db and collection
      const db = client.db('items');
      const todo = db.collection('todos');
      // POST
      app.post('/quotes', (req, res) => {
        // console.log('heeyyyylooo')
        // console.log(req.body)
        // Post Data to DB
        todo.insertOne(req.body)
            .then((result) =>{
              res.redirect('/');
            })
            .catch((err) => console.log(err));
      });
      // READ
      app.get('/', (req, res) => {
        // res.sendFile(__dirname +'/public/views/index.ejs');
        // Read from DB
        db.collection('todos').find().toArray()
            .then((results) => {
              //console.log(results);
              res.render('index.ejs', {todos: results});
            })
            .catch((err) => console.log(err));
      });
      // DEL
      app.get('/del', (req, res) =>{
        console.log('delete me')
        res.redirect('/');
      })
    })
    .catch((error) => console.error(error));


// app.get('/hey', (req, res)=>{
//   res.sendFile(__dirname + '/public/hey.html');
// });
