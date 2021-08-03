const express = require('express');
const adminroute = express.Router();
const admin = require('../coontroller/admin');
const {Checkauth, Checkuser, Checkadmin} = require('../middleware/authmiddleware');

adminroute.get("/",Checkuser,Checkauth,Checkadmin,admin.getadmin);
adminroute.get("/users",Checkuser,Checkauth,Checkadmin,admin.getadmin_users );
adminroute.get("/posts",Checkuser,Checkauth,Checkadmin,admin.getadmin_posts );

adminroute.post('/users',admin.makeAdmin);
adminroute.delete('/users',admin.Delete);
adminroute.delete('/posts',admin.PDelete);


module.exports = adminroute;