const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const offerrouter = require('./routes/offerroutes')
const auth = require('./routes/authroutes');
const admin = require('./routes/adminroute');

const profilerouter = require('./routes/profileroute');
const { Checkuser} = require('./middleware/authmiddleware');


const app = express();

const port = process.env.PORT || 4000;
const database = 'mongodb://Chaker:17102001cH@cluster0-shard-00-00.xydo5.mongodb.net:27017,cluster0-shard-00-01.xydo5.mongodb.net:27017,cluster0-shard-00-02.xydo5.mongodb.net:27017/Mar7badb?ssl=true&replicaSet=atlas-q1pwjr-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(()=>{
    console.log('done');
    app.listen(port);

   })
   .catch((err)=> console.log(err));
   
  app.set('view engine', 'ejs');//embadded js

  app.use(express.json());
  app.use(express.urlencoded({extended : true}));
  app.use(express.static('pub'));//for  front-end files file
  app.use('/uploads', express.static('uploads'));//uploading images
  app.use(cookieparser());
  
  app.get('/', Checkuser ,(req, res)=>{
      res.render('mar7ba', { head_title : 'Hirafi'})
  });
  app.use(  auth);
  app.use('/Admin',admin);
  app.use('/Orders',Checkuser, offerrouter);
  app.use(profilerouter);
  app.use((req, res)=>{
      res.status(404).render('404', { head_title : '404'})
  })

  