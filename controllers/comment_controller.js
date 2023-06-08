const comments=require('../models/comments');
const post=require('../models/posts');
module.exports.create=function(req,res){
    
    if(req.isAuthenticated()){
        post.findById(req.body.post_id).then(function(data,err){
            if(err){
                console.log(err);
                return res.redirect('/user/profile');
                
            }
            
            if(data){
                comments.create({
                    content:req.body.content,
                    user_id:req.user._id,
                    post_id:req.body.post_id
                }).then(function(Curr_comment,err){
                    if(err){
                        console.log(err);
                        return res.redirect('/user/profile');
                    }
                    data.comments.push(Curr_comment);
                    data.save();
                    return res.redirect('/user/profile');
                })
            }
            

        })
    }
    else{
        return res.redirect('/user/signIn');
    }
}
module.exports.show=function(req,res){
   
    if(req.isAuthenticated()){
        post.findById(req.query.post_id).populate({path:'user_id'}).populate({path:'comments',populate:{path:'user_id'}}).then(function(data,err){
            if(err){
                console.log(err);
                return res.redirect('/user/profile');
            }
            if(data){
                return res.render('comments',{post_detail:data});
            }
        })
    }
    else{
        return res.redirect('/user/signIn');
    }
    
}
module.exports.delete=function(req,res){
    if(req.isAuthenticated()){
        if(req.query.user_id==req.user._id){
            comments.deleteOne({'_id':req.query.id}).then(function(){
                
                post.findByIdAndUpdate({'_id':req.query.post_id},{$pull:{comments:req.query.id}}).then(function(){
                    console.log('Comment deleted sucessfully');
                    return res.redirect('/user/profile');
                })
            })
            //To also delete comment_id from comments array in post
            
            
        }
    }
   
}