const express=require('express');
const routes=express.Router();
const userController=require('../controllers/user_controller')
//here we imported passport module
const passport=require('passport')

routes.get('/signIn',userController.signIn);
routes.get('/signUp',userController.signUp);
routes.post('/create',userController.create)
routes.get('/profile',passport.checkAuthentication,userController.profile);
//Here we use passport middelwere for authentication
routes.post('/start_session',passport.authenticate(
    'local',
    {
        failureRedirect:'/user/signIn'
    }
),userController.startSession)
routes.get('/signOut',userController.destroySession)

module.exports=routes;
