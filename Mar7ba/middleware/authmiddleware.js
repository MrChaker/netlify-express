const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Checkauth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'secret', (err, decodedToken)=>{
            if(err){
                if(req.url == '/auth/log-in'){
                    next();
                }else{
                    res.redirect('/auth/log-in');
                }
            }else{             
                if(req.url == '/auth/log-in' || req.url == '/auth/Sign-in'){
                    res.redirect('/Profile');
                }else{
                    next();
                }
            }
        })
    }else{
        if(req.url == '/auth/log-in'){
            next();
        }else if(req.url == '/auth/Sign-in'){
            next();
        }else{
            res.redirect('/auth/log-in');
        }
    }
}
/* const Checkauth2 = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'secret', async(err, decodedToken)=>{
            const user = await User.findById(decodedToken._id);
            if(err){
                next();
            }else if (user.Type === ''){
                res.redirect('/auth/Choose');               
            }else{
                next()
            }
        })
    }else{
        next();
    }
} */


// function for using user info in the views
const Checkuser = (req, res, next)=>{
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token, 'secret', async (err, decodedToken)=>{
            if(err){
                console.log(err);
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;            
                next()
            }
        })
    }else{
        res.locals.user = null;
        console.log("hihi");
        next();
    }
}
const Checkadmin = (req, res, next)=>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, 'secret', async (err, decodedToken)=>{
            if (err){
                res.redirect('/')
            }else{
               const user = await User.findById(decodedToken.id);
               if (user.isAdmin){

                   next();
               }else{
                res.redirect('/')
               }
            }
        })
    }else{
        res.redirect('/');
    }
    
}


module.exports = { Checkauth, Checkuser, Checkadmin}