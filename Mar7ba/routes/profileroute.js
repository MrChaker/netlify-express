const express = require('express');
const profilerouter = express.Router();
const Profile = require('../coontroller/profile');
const fileup = require('express-fileupload');
const fileUpload = require('express-fileupload');
const {Checkauth,/* Checkauth2, */ Checkuser} = require('../middleware/authmiddleware');

profilerouter.use(fileUpload());
profilerouter.get('/Profile/:id', Checkuser,Profile.Profileid);

profilerouter.get('/Profile', Checkauth,Checkuser,Profile.Profile);

profilerouter.post('/Profile', Profile.postimg);
profilerouter.post('/Profile/info', Profile.postinfo);





module.exports = profilerouter;

