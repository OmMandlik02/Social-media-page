const mongoose=require('mongoose');
const multer=require('multer')
const path = require('path')
const AVATAR_PATH=path.join('/uploads/posts/avatars')
const posts=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    time : 
    { 
        type : Date,
        default:new Date()
    },
    avatar:{
        type:String
    },
    //Include array of all id's of comment releated to particular post
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
    ]
},
{
    timestamps:true
})

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname+'/..'+AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
})


posts.statics.avatar_path=AVATAR_PATH;
posts.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
const post=mongoose.model('Posts',posts);
module.exports=post