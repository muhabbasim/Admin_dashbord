// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true); 
  mongoose.connect(url,{
    useNewUrlParser: true,
  })
}
export default connectDB;
