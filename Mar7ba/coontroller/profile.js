const User = require('../models/user');
const fileup = require('express-fileupload');
const jwt = require('jsonwebtoken');




module.exports.postimg = ('/upload', (req, res)=> {
  
  jwt.verify(req.cookies.jwt, 'secret', async (err, decodedToken)=>{
      let profilefile;
      let uploadPath;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      // The name of the input field (i.e. "profilefile") is used to retrieve the uploaded file
      profilefile = req.files.profilefile;
      uploadPath = './uploads/' + profilefile.name;
      // save it to date base
      
      const user = await User.findByIdAndUpdate(decodedToken.id, {image : { path: uploadPath} }, (err, doc)=>{
        // Use the mv() method to place the file somewhere on your server
          profilefile.mv(uploadPath, function(err) {
            if (err)
              return res.status(500).send(err);

              res.redirect('back');
  });
      
      }); 
      
  })
});
module.exports.postinfo = ('/upload',(req, res)=>{
  
   if(req.body.postid == 2){  // For Information
   console.log(req.body.postid)
    jwt.verify(req.cookies.jwt,'secret', async (err, decodedToken)=>{
      const user =  await User.findByIdAndUpdate(decodedToken.id,
        {info : 
          {
            fname : req.body.fname,
            lname : req.body.lname,
            job: req.body.job,
            Wilaya: req.body.Wilaya,
            phone : req.body.phone,
            fulladress : req.body.fadress
          }
          },
        (err, doc)=>{
          
        res.status(201).json({ result : req.body })   
      })
    })}else if(req.body.postid==1){//For Description
      jwt.verify(req.cookies.jwt,'secret', async (err, decodedToken)=>{  
        const user =  await User.findByIdAndUpdate(decodedToken.id,{isAdmin : true, description : req.body.description},(err, doc)=>{         
         res.status(201).json({ result : req.body });        
         })
       })
    }else{ // For portfolio
        jwt.verify(req.cookies.jwt, 'secret', async (err, decodedToken)=>{
          let portfoliofile;
          let uploadPath;
          if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
          }
          // The name of the input field (i.e. "profilefile") is used to retrieve the uploaded file
          portfoliofile = req.files.portfoliofile;
          uploadPath = './uploads/port/' + portfoliofile.name;
          
          let user = await User.findById(decodedToken.id);
          let uploadPatharr = user.portfolio.path; 
          let uploadtitlearr = user.portfolio.title;          
          uploadPatharr.push(uploadPath);
          uploadtitlearr.push(req.body.ptitle);
          // save it to date base        
           user = await User.findByIdAndUpdate(decodedToken.id, {portfolio:{ path : uploadPatharr, title:uploadtitlearr } }, (err, doc)=>{
            // Use the mv() method to place the file somewhere on your server
            
            portfoliofile.mv(uploadPath, function(err) {
                if (err)
                  return res.status(500).send(err);
    
                  res.redirect('back');
              });
          
          }); 
          
       })
    }
});

module.exports.Profile = (req, res)=>{
    res.render('Offersdir/Profile', { head_title : 'Profile'})
}




module.exports.Profileid = (req, res)=>{
  const id = req.params.id;
  jwt.verify(req.cookies.jwt,'secret', async (err, decodedToken)=>{
      if(decodedToken.id == id){
          res.redirect('/Profile');
      }else{
        User.findById(id)
          .then( result =>{
            res.render('Offersdir/Profileid', { head_title : 'Profile', thisuser : result})
          })
          .catch(err => console.log(err))
      }
    });
}



