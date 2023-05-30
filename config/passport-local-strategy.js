const passport=require('passport');
const LocalStrategy=require('passport-local')
// Here above we define middelwere to tell the passport to use local module
const user=require('../models/user')
passport.use(new LocalStrategy(
    {
        usernameField:'Username'
    },function(Username,password,done){
        user.findOne({'Username':Username}).then(function(data,err){
            if(err){
                return done(err);
            }
            if(!data){
                return done(null,false);
            }
            if(data.password!=password){
                return done(null,false);
            }
            return done(null,data);
        })
    }
))
// serializer is used to decide which key is to be kept in cookies
passport.serializeUser(function(data,done){
    done(null,data.id);
})

// Deseralizer is used to deseralize the user (i.e. to identify the user) using the key in cookie
passport.deserializeUser(function(id,done){
    user.findById(id).then(function(data,err){
        if(err){
            return done(err);
        }
        return done(null,data)
    })
})



// To check wether current user is authenticated  we create below function and use it as middelwere
passport.checkAuthentication=function(req,res,next){
// passport module adds isAuthenticated() function in request send by browser which verify wether user is authenticated or not .If authenticted then function return true otherwise false 
    if(req.isAuthenticated() ){
        return next();
    }
    return res.redirect('/user/signIn');
}

// To set the locals in res as req.user 
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains current sign in user from session cookie and we are just sending this to locals for the views this will be used in ejs page for direct access
        res.locals.user=req.user
    }
    next()
}


module.exports=passport




























