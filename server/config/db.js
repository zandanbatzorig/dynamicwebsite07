const mongoose = require('mongoose');
const connectDB = async () => {
  
try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
        serverSelectionTimeoutMS: 20000,
        socketTimeoutMS: 45000,
    });
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.error('Failed to connect to MongoDB:', error);
  }



  

}

module.exports = connectDB;