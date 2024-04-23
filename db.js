const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useNewUrlParser : true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDb server is running at ${process.env.MONGO_URL}`);
        console.log(conn.connection.host);
    }catch(error){
        console.log(error);
        console.log("Some Error has occured please check the Error");
    }
};

module.exports = connectDB;