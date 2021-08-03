const express = require('express');
const auth = express.Router();
const authctrl = require('../coontroller/authcontroller');
const {Checkauth, Checkuser} = require('../middleware/authmiddleware');

auth.get('/auth/Sign-in',Checkauth, authctrl.getSign );
auth.post('/auth/Sign-in', authctrl.postSign );

auth.get('/auth/Log-in',Checkauth, authctrl.getlog);
auth.post('/auth/Log-in', authctrl.postlog);

auth.get('/auth/logout', authctrl.getlogout);



module.exports = auth;