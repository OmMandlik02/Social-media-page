const mongoose=require('mongoose')

const comment=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }
},{
    timestamps:true
})

const comments=mongoose.model('comments',comment);
module.exports=comments;
