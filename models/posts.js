const mongoose=require('mongoose');
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

const post=mongoose.model('Posts',posts);
module.exports=post