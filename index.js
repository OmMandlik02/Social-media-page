const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')
const mongoose=require('./config/mongoose');
const path =require('path');
const port=8000;
const passport=require('passport');
const LocalStrategy=require('./config/passport-local-strategy')
const session=require('express-session');
const MongoStore=require('connect-mongo')
const sassMiddelware=require('node-sass-middleware');


app.use(express.urlencoded());
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'assets')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(sassMiddelware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
// prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css">
}))

app.use(session({
    name:'User_id',
    //The below cookie is used to encrypt the details in cookie
    secret:'Om Mandlik',
    // The below will prevent to save the same cookie again and again
    resave:false,
    // The below will whenever the session is not initialized or user has not loged in or identity is not established then it will not store any data in cookie
    saveUninitialized:false,
    cookie:{
        //Below is the age of the cookie for which it is valid
        maxAge:(1000*60*10)
    },
    // MongoStore is used to store the session cookie in the database
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/Authentication_Passport',
        autoRemove:'disabled'
    },function(err){
        if(err){
            console.log(err);
        }
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser )

app.use('/',require('./routes/home'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return ;
    }
    console.log(`Server is running sucessfully at port: ${port}`);
})