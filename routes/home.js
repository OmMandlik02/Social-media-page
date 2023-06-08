const express=require('express');
const routes=express.Router();
const homeController=require('../controllers/home_controller')

routes.get('/',homeController.home);
routes.use('/user',require('./user'))
routes.use('/post',require('./post'));
routes.use('/comment',require('./comment'))

module.exports=routes;