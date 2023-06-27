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
routes.post('/start_session'
,passport.authenticate(

    'local',
    {
        failureRedirect:'/user/signIn',
        
    }
),userController.startSession) // Here in this route there is no request as parameter so to add flash we add req.flash in passport local strategy as it used in this request
routes.get('/signOut',userController.destroySession)
routes.post('/Profile_photo',passport.checkAuthentication,userController.profile_photo);
routes.get('/remove_profile_photo',passport.checkAuthentication,userController.remove_profile_photo)

module.exports=routes;
