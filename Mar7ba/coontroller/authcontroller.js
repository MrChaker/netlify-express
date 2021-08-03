const { json } = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



const handlerr = (err)=>{
  
  let errors = { username:"", Email:"", Password:""};
  if (err.message === "Email incorrect"){
    errors.Email = "Email is incorrect"
  }
  if (err.message === "Password incorrect"){
    errors.Password = "Password is incorrect"
  }
//validation error
  if (err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
    })
    if (err.message.includes('expected `username` to be unique')){
        errors.username ="Username already used";
    };
    if (err.message.includes('expected `Email` to be unique')){
      errors.Email ="Email already used";
    }
  }
  return errors
}
//jwt
const maxAge = 60* 60* 24* 3 ;
const createtoken = (id)=>{
  return jwt.sign({id}, "secret",{
    expiresIn : maxAge
  })
};

module.exports.getSign = (req, res)=>{
    res.render('auth/Sign in', { head_title: 'Creating new account' })
};

module.exports.postSign = async (req, res)=>{
  
  const {username, Email, Password, Type} = req.body;
    try {
      const user = await User.create({isAdmin : false,username, Email, Password, Type});
      const token = createtoken(user._id);
      res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge * 1000});
      
      res.status(201).json({ user: user.Type })
    } catch (error) {   
       const errors = handlerr(error);
       res.status(400).json({ errors })
    }
}; 

module.exports.getlog = (req, res)=>{
    res.render('auth/Login', { head_title: 'Log in' })
  };


module.exports.postlog = async (req, res)=>{ 
 console.log('hi')
  const {Email, Password} = req.body;
  try {
    const user = await User.login(Email, Password);
    const token = createtoken(user._id);
    res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge * 1000});
    
    res.status(201).json({ user : user.Type});
  } catch (error) {
    const errors = handlerr(error);
    res.status(400).json({ errors });
  }
};

module.exports.getlogout = (req, res)=>{
  
  res.cookie('jwt', '', {maxAge : 0.00001});

  res.redirect('/auth/log-in')
}



