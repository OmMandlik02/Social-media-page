const express=require('express');
const routes=express.Router();
const homeController=require('../controllers/home_controller')

routes.get('/',homeController.home);
routes.use('/user',require('./user'))

module.exports=routes;