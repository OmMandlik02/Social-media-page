const express=require('express')
const routes=express.Router();
const commentController=require('../controllers/comment_controller');
const passport=require('passport')


routes.post('/create',passport.checkAuthentication,commentController.create);
routes.get('/show',passport.checkAuthentication,commentController.show);
routes.get('/delete',passport.checkAuthentication,commentController.delete)

module.exports=routes