const express = require('express');
const connectDB = require('./db');
const app = express();//express
const dotenv = require('dotenv');
const authroute = require('./routes/authroutes');
const mongar = require('morgan');
const clinicroutes = require('./routes/clinicroutes');
const contactroute = require('./routes/contactroutes');
const reviewroute = require('./routes/reviewroutes');
const medroute = require('./routes/medroutes');
const adminroutes = require('./routes/adminroutes');
const cloudinary = require('cloudinary');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const port = 5000;
const bodyParser = require('body-parser');

dotenv.config();//env file ....config
connectDB();//connectto he database

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
);
//for fileUploading
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Middlewares
app.use(express.json());//all type of jsondata transfer
app.use(bodyParser.json());//object ---parse ...javascript object {}
app.use(bodyParser.urlencoded({extended : false}));


//routers
app.use('/api/v1/auth',authroute);//authetication req
app.use('/api/v1/clinic',clinicroutes);//handle req
app.use('/api/v1/contact',contactroute);//handle req;
app.use('/api/v1/review',reviewroute);//handle req
app.use('/api/v1/medicine',medroute);//handle req
app.use('/api/v1/admin',adminroutes);


//default
app.get("/",(req,res)=>{
    res.status(200).send("Message sent to server side programming");
})

//port env
app.listen(port,()=>{
    console.log("Listening to the port");
})