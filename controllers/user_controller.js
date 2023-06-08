const user=require('../models/user');
const post=require('../models/posts');
module.exports.profile=function(req,res){
    post.find({}).populate('user_id').then(data=>{
        return res.render('user_detail',{user_post:data});
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    res.render('sign_in');
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    res.render('sign_up');
}
module.exports.create=function(req,res){
    user.findOne({'Username':req.body.Username}).then(function(data,err){
        if(err){
            console.log(err);
            return res.redirect('/user/signUp');
        }
        if(!data ){
            if( req.body.confirm_password==req.body.password){
                var myData=new user(req.body);
                myData.save();
                return res.redirect('/user/signIn');
            }
            else{
                console.log('Password and confirm password are not matching')
                return res.redirect('/user/signUp');
            }
        }else{
            return res.redirect('/user/signUp');
        }
        

    })
}
module.exports.startSession=function(req,res){
    console.log('user finded')
    return res.redirect('/user/profile');
}
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    });
    return res.redirect('/')
}