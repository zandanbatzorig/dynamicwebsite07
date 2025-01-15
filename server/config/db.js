const mongoose = require('mongoose');
const connectDB = async () => {
  
try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect('mongodb+srv://raddy:N7cJGzWpEtLxFfXT@cluster0.be7ts.mongodb.net/blog');
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;