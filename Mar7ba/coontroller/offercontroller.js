const Offer = require('../models/offers.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const url = require('url');

module.exports.primary = (req, res)=>{
    const current_url = new URL(`http://Hirafi.com/Orders${req.url}`);
    const search_params = current_url .searchParams;

    // get url parameters
    let Job = search_params.get('Job');
    let Type = search_params.get('Type');
    let Wilaya = search_params.get('Wilaya');
    let filtered = {Job ,Wilaya};
    
    
    if(req.url.includes("Job")){
        Job = ( Job=="All") ? /./g : Job;
         Wilaya = ( Wilaya=="All") ? /./g : Wilaya;
        if(Type.includes("Worker")){
            Type="Worker";
        }else if (Type.includes("Client")){
            Type="Client";
        }else{
            Type = ( Type=="All") ? /./g : Type;
        }    
        Offer.find({$and: [{ Job },{Wilaya},{ Type }]})
            .then((result)=>{              
                res.render('Offersdir/Orders', { head_title : 'Hirafi | Posts', offers: result, filtered})
            })
            .catch((err)=> console.log(err))
    }else{
        Offer.find()
        .then((result)=>{
            filtered = {Job:"All" ,Wilaya:"All"};
            res.render('Offersdir/Orders', { head_title : 'Orders', offers: result, filtered})
        })
        .catch((err)=> console.log(err));
    }
};

module.exports.Ocreat = (req, res)=>{
    res.render('Offersdir/New-offer', { head_title : 'Create new offer'})
};   

module.exports.someoffer = (req, res)=>{
    const id = req.params.id;
    Offer.findById(id)
      .then((result)=>{
          res.render('Offersdir/someoffer', { offer : result , head_title : 'Details'})
      })
      .catch( err => console.log(err))
};


module.exports.OPost =  (req, res)=>{

    if(req.body.id == 1){       
            res.status(201).json({
                filteredjob: req.body.Job,
                filteredWilaya: req.body.Wilaya,
                filteredType : req.body.Type
                });
    }else{
    req.body.Available = true; 
    // Getting the user info to the database
    jwt.verify(req.cookies.jwt,'secret', async (err, decodedToken)=>{
        if(err){
            console.log(err);
        }else{          
           const user = await User.findById(decodedToken.id);         
           if(!user.image.path){
                user.image.path = "/images/account.png"
           }         
                const offer = new Offer( {
                        image : user.image.path,
                        User: user.username,
                        Wilaya: user.info.Wilaya,
                        Job: user.info.job,
                        Type : user.Type,
                        id : user._id,
                        Extra_info : req.body.Extra_info,
                        Available : true
                } );
                offer.save()
                    .then((result)=>{
                        
                        res.redirect('/Orders')
                    })
                    .catch((err)=> console.log(err)) 
            
           }
    });
   }
     
};

module.exports.Odelete = (req, res)=>{
    const id = req.params.id;
    Offer.findByIdAndDelete(id)
      .then((result)=>{ 
          res.json({ redirect :'/Orders'})
      })
      .catch( err => console.log(err))
  };

  /* module.exports.profile = (req, res)=>{
    res.render('Offersdir/Profile', { head_title : 'Profile'})
  }; */
