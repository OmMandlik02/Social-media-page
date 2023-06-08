const mongoose=require('mongoose');
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
    }
},{
    timestamps:true
})

const Users=mongoose.model('user',UserDeatil);
module.exports=Users;