const user=require('../models/user');
const post=require('../models/posts');

const fs=require('fs');
const path=require('path')

module.exports.profile=function(req,res){
    post.find({}).populate('user_id').sort('-createdAt').then(data=>{
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
                // var myData=new user(req.body);
                // myData.save();
                // req.flash('success','Signed Up Successfully')
                // return res.redirect('/user/signIn');
                
                // As we have also uploading file in sign up page so we are setting enctype="multipart/form-data"  in form . So we have to use multer to handle form data . We cannot use above methods
                user.uploadedAvatar(req,res,function(err){
                    if(err){
                        console.log("Multer error"+err);
                        return;
                    }
                    if(req.file){
                        user.create({
                            Username:req.body.Username,
                            password:req.body.password,
                            name:req.body.name,
                            age:req.body.age,
                            birthdate:req.body.birthdate,
                            avatar:user.avatar_path+'/'+req.file.filename
                        })
                    }
                    else{
                        user.create({
                            Username:req.body.Username,
                            password:req.body.password,
                            name:req.body.name,
                            age:req.body.age,
                            birthdate:req.body.birthdate,
                        })
                    }
                    req.flash('success','Signed Up Successfully')
                    return res.redirect('/user/signIn');
                })  
            }
            else{
                req.flash('error','Password and confirm password are not matching');
                return res.redirect('/user/signUp');
            }
        }else{
            req.flash('success','Username Already Exist!')
            return res.redirect('/user/signUp');
        }
        

    })
}
module.exports.startSession=function(req,res){
    req.flash('success','Signed in sucessfully!')
    return res.redirect('/user/profile');
}
module.exports.destroySession=function(req,res){
        req.logOut(function(err){
            req.flash('success','Signed Out sucessfully!');
            return res.redirect('/')
        });
        
        
}

module.exports.profile_photo=function(req,res){
    user.uploadedAvatar(req,res,function(err){
        if(err){
            console.log("Multer error: "+err);
            return;
        }
        console.log(req.file);
        if(req.file){

            user.findOneAndUpdate({_id:req.user._id},{avatar:user.avatar_path+'/'+req.file.filename}).then(function(data,err){
                if(data.avatar){
                    //the "data" in callback of update is not the updated data it is data before update
                    fs.unlinkSync(path.join(__dirname,'/..',data.avatar));
                    
                }
                req.flash('success','Profile photo updated successfully');
            });
            
        }
        else{
            req.flash('error','Please select the photo');
        }
        return res.redirect('/user/profile');
    })
}

module.exports.remove_profile_photo=function(req,res){
    user.findOneAndUpdate({_id:req.user._id},{$unset:{avatar:1}}).then(function(data,err){
        if(err){
            console.log(err);
            return;
        }
        if(data.avatar){
            fs.unlinkSync(path.join(__dirname,'/..',data.avatar));
            req.flash('success','Profile photo removed successfully!')
        }
        return res.redirect('/user/profile');
    })
}