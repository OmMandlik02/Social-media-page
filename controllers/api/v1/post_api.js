const post=require('../../../models/posts');
const user=require('../../../models/user');
const comments=require('../../../models/comments');

module.exports.posts=function(req,res){
    // 
    post.find({}).sort('-createdAt').populate({path:'user_id',populate:{path:'name',path:'birthdate',path:'Username',path:'avatar'}}).then(function(data,err){
        if(err){
            console.log(err);
            return;
        }
        return res.json({
            data:{
                message:"Posts are sent successfully",
                post:data
            }
        })
    })
   
}

module.exports.delete=function(req,res){
    post.deleteOne({'_id':req.query.id},{'user_id':req.query.user_id}).then(function(data,err){
        if(err){
            console.log(err);
            return;
        }
    })
    comments.deleteMany({'post_id':req.query.id}).then(function(){
        console.log('All comments releated to post are also deleted sucessfully');
            return res.json({
                 data:  {       
                    id:req.query.id,
                    message:"Post and associated comments are Deleted successfully "
                }
            })
    })

}