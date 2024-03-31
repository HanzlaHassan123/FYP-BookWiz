const express=require('express')
const router=express.Router()
const catchAsync=require('../utils/catchAsync')
const User=require('../models/users')
const ExpressError=require('../utils/ExpressError')
const joi=require('joi')
//const {userSchema}=require('../joiSchemas')
const {userSchema}=require('../joiSchemas')
const passport=require('passport')
const {isLoggedIn}=require('../middleware')


const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}




router.get('/',(req,res)=>{
    res.send("Hello from auth")
})


router.get('/all', isLoggedIn,catchAsync(async (req, res) => {
  
    const user = await User.find({});
   console.log(user)
    res.send(user);

}));


router.post('/register', catchAsync(async (req, res, next) => {
    try {
        console.log("hi  "+JSON.stringify(req.body))
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            // req.flash('success', 'Welcome to Yelp Camp!');
            // res.redirect('/campgrounds');
            res.send(registeredUser);
        })
    } catch (e) {
        // req.flash('error', e.message);
        // res.redirect('register');
        res.send(e.message);
    }
}));

// router.post('/new',validateUser, catchAsync(async (req, res, next) => {
//    // console.log(req.body);
//     //if (!req.body.user) throw new ExpressError('Invalid user Data', 400);
   
//     const user = new User(req.body.user);
//     console.log("user"+user)
//     await user.save();
//     res.send(user);
   
//   }));


//it takes username and password for login
router.post('/login', passport.authenticate('local'), (req, res) => {
   // req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/notes';
    delete req.session.returnTo;
   // res.redirect(redirectUrl);
   res.send("login successfull")
})



router.get('/logout', (req, res) => {
req.logout(function (err) {
// if (err) { return next(err); }
//req.flash('success', "Goodbye!");
res.send('logout successfull');
});
})









module.exports=router