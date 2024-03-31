const mongoose=require('mongoose')

//mongoose returns promises so we use asyn await.. so that at every step we can wait for the response
async function connectDB() {
    try {

      await mongoose.connect(process.env.MONGO_URL, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true
      });
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
  
  module.exports = connectDB;