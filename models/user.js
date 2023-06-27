const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');

const AVATAR_PATH=path.join('/uploads/user_profile/avatars')

const UserDeatil=new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    birthdate:{
        type:Date,
        required:true
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
})

var storage=multer.diskStorage({
    // Here cb is call back Function
    destination:function(req,file,cb){
        cb(null,path.join(__dirname+'/..'+AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }

})

// Here statics is same as as static Variable in OOPS . In statics we can declear various static variable with differebt names
UserDeatil.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
UserDeatil.statics.avatar_path=AVATAR_PATH;

const Users=mongoose.model('user',UserDeatil);
module.exports=Users;