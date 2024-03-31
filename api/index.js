const express= require('express')
const mongoose=require('mongoose')

const dotenv=require('dotenv')
const connectDB=require('./db.js')

dotenv.config();
const app=express();
console.log(process.env.MONGO_URL)
connectDB();



app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(4000,()=>{
    console.log("Server is listening on port 4000");
})