const User = require('../models/user');
const Post = require('../models/offers');
module.exports.getadmin = async (req, res)=>{
    console.log('adminn')
    var workers, clients, posts = 0;
    await User.countDocuments({Type: "Client"},(err,count)=>{
        if(err){
            clients = 0
        }else
         {clients = count}
    });
    await User.countDocuments({Type: "Worker"}, function (err, count) {
        if (err){
            workers = 0
        }else{
            workers = count
        }});
    await Post.countDocuments((err, count)=>{
        posts= count
    })
           
    res.render("Admin/dash", {head_title : "Admin dashboard", workers, clients, posts})
};
module.exports.getadmin_users = (req, res)=>{
    User.find()
    .then((result)=>{
        
        res.render("Admin/users", {head_title : "Admin dashboard | users", users: result})
    })
    .catch(err=> console.log(err))
    
};
module.exports.getadmin_posts = (req, res)=>{
    Post.find()
    .then((result)=>{
      
        res.render("Admin/posts", {head_title : "Admin dashboard | posts", posts: result})
    })
    .catch(err=> console.log(err))
    
};

module.exports.makeAdmin = (req, res)=>{
    
    User.findByIdAndUpdate(req.body.id, {isAdmin : true}, (err, doc)=>{
        if(err){
            console.log(err)
        }else{
            res.status(201);
        }
    })
}
module.exports.Delete = (req, res)=>{
    
    User.findByIdAndDelete(req.body.id)
     .then(()=> res.status(201))
     .catch(err => console.log(err))
        
   
}
module.exports.PDelete = (req, res)=>{
    
    Post.findByIdAndDelete(req.body.id)
     .then(()=> res.status(201))
     .catch(err => console.log(err))
        
   
}