const express= require('express')
const mongoose=require('mongoose')
const router=express.Router()
const dotenv=require('dotenv')
const connectDB=require('./db.js')
const catchAsync=require('./utils/catchAsync')
const ExpressError=require('./utils/ExpressError')
const methodOverride = require('method-override');
//The path module is a core Node.js module that provides utilities for working with file and directory paths
const path = require('path');
const session = require('express-session');
//This is particularly useful when you want to show some one-time notifications to the user, such as success messages, error messages,
const flash = require('connect-flash');
const User=require('./models/users')
const Notes=require('./models/notes')
const joi=require('joi')
const MongoStore = require('connect-mongo');

//now we will use passport for authntication.. it can support google and fb login as well
//but here we will use a local strategy of login
const passport = require('passport');
const LocalStrategy = require('passport-local');



//passport.initialize() is a middleware used to initialize passport. If your application uses persistent login sessions, passport.session() middleware must also be used.

//app.use(session) must be used before passport.session() to ensure that the login session is restored in the correct order.

dotenv.config();
const app=express();





console.log(process.env.MONGO_URL)
connectDB();



//for parsing the body in json format
app.use(express.json())
//parses incoming request bodies. It's used when you want to grab information from forms sent with the POST request method.
app.use(express.urlencoded({ extended: true }));
//allows for HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride('_method'));


// Middleware setup
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  collectionName: 'sessions', // Optional: Specify the session collection name
  ttl: 24 * 60 * 60, // Time-to-live (expiration time) in seconds
});

// Configure session middleware with MongoDBStore

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
  })
);



//app.use(session(sessionConfig))
app.use(flash());

//passport initialize and session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
  console.log("session info in use")
   // console.log(req.session)
    console.log("user info in session use")
   // console.log(req.user)
     //res.locals.currentUser = req.user;
    //  res.locals.success = req.flash('success');
    //  res.locals.error = req.flash('error');
    next();
})

//available routes
app.use('/api/user',require('./routes/user'))
app.use('/api/notes',require('./routes/notes'))


app.use((req, res, next) => {
  if(!['/login', '/'].includes(req.originalUrl)) {
      req.session.returnTo = req.originalUrl;
  }
  //res.locals.currentUser = req.user;
  next();

})




app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/fake',async (req, res) => { 
  console.log(req.body)
  res.send(req.body)
  // const user = new User({ email: 'colt33@gmail.com', username: 'colt33' });
  // //user.setPassword('tacotaco');
  // const newuser= await User.register(user, 'tacotaco')
  // res.send(newuser);
 // res.send("Hello")
})


app.all('*',(req,res,next)=>{
  next(new ExpressError("Page not found",404))
})
//if no route is found then this will be executed

app.use((err, req, res, next) => {
  console.log(err)
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).json({ error: err.message })
});

app.listen(4000,()=>{
    console.log("Server is listening on port 4000");
})