const express=require('express');
const routes=express.Router();
const passport=require('passport')
const postController=require('../controllers/post_controller')
// console.log('In router')
routes.post('/create',passport.checkAuthentication,postController.create);
routes.get('/delete',postController.delete);

module.exports=routes;