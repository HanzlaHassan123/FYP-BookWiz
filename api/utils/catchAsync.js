module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

//returning a function that accepts a function as an argument 
//and returns a new function that accepts req, res, 
//and next as arguments. The new function calls the original function //
//and catches any errors that might be thrown. It then passes them along 
//to the next() function. This allows us to catch any errors that might 
//occur in an asynchronous function and pass them along to our error 
//handling middleware. This is a common pattern in Express.