module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
       
       // req.flash('error', 'You must be signed in first!');
        return res.send('please login first');
    }
    console.log("user is logged in can go further")
    next();
}