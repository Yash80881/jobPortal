const mongoose = require('mongoose');

const connectDB = async () => {
  try{
      // console.log(process.env.DB_URL);
      
       await mongoose.connect(process.env.DB_URL);
       console.log("Mongo DB connected");
  }
  catch(err){
        console.error(err);
        process.exit(1);
        //throw err;
  }
}

module.exports = connectDB;