const mongoose = require('mongoose');
const connectDB = async () => {
  
try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect('mongodb+srv://raddy:N7cJGzWpEtLxFfXT@cluster0.be7ts.mongodb.net/blog?retryWrites=true&w=majority',{
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