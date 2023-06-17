const posts=require('../models/posts');
const comments=require('../models/comments');
module.exports.create=function(req,res){
    
    posts.create({
        content:req.body.content,
        user_id:req.user._id
    }).then(function(post,err){
        if(err){
            console.log(err);
            return ;
        }
        if(req.xhr){
            post.populate('user_id','name').then(function(data,err){
                if(err){
                    console.log(err);
                    return err;
                }
                return res.json({
                    data:{
                        post:data
                    }
                })
            })
            
        }
        else{
            return res.redirect('/user/profile');
        }
        
    })
    
    
    
}
module.exports.delete=function(req,res){
    if(req.query.user_id==req.user.id){
        posts.deleteOne({'_id':req.query.id},{'user_id':req.query.user_id}).then(function(){
        })
        comments.deleteMany({'post_id':req.query.id}).then(function(){
            console.log('All comments releated to post are also deleted sucessfully');
            if(req.xhr){
                console.log('JJJJJJJJJJJJJJJJJJJJ')
                return res.json({
                     data:  {       
                        id:req.query.id,
                        message:"Post Deleted successfully"
                    }
                })
            }
        })
        req.flash('success','Post deleted sucessfully');
    }else{
        req.flash('error','You are not authorized to delete the post');
    }
    return res.redirect('/user/profile')
}