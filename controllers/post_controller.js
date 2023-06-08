const posts=require('../models/posts');
const comments=require('../models/comments');
module.exports.create=function(req,res){
    
    posts.create({
        content:req.body.content,
        user_id:req.user._id
    }).then(function(err,post){
        if(err){
            console.log(err);
            return ;
        }
        console.log('Post created sucessfully')
        return res.redirect('/user/profile');
    })

    return res.redirect('/user/profile');
}
module.exports.delete=function(req,res){
    if(req.query.user_id==req.user._id){
        posts.deleteOne({'_id':req.query.id},{'user_id':req.query.user_id}).then(function(){
            console.log('Post deleted sucessfully')
        })
        comments.deleteMany({'post_id':req.query.id}).then(function(){
            console.log('All comments releated to post are also deleted sucessfully');
        })

    }else{
        console.log('You are not authorized to delete the post');
    }
    return res.redirect('/user/profile')
}