const jwt = require('jsonwebtoken');
const usermodel = require('../model/usermodel');

//Middlewares
const requireSignIn = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).send({
                success : false,
                message : "I do not get the authorization token",
            })
        }
        ///req user----(name,email,password)
        const decode = jwt.verify(token,process.env.secretkey);
       // console.log(decode);//decode contains token related information such as (_id,iat,exp) etc
        req.user = decode;
        next();//next line of code will be preformed
    }catch(error){
        console.log(error);
        res.status(404).send({
            success: false,
            message : "Not signed in User",
            error,
        })
    }
};

const isAdmin = async(req,res,next)=>{
    try{
        const id = req.user._id;
        if(!id){
            console.log(id);
            return res.status(401).send({message: 'Id does not exist'});
        }
        //find the user who is loggin in
        const user = await usermodel.findById(id);
        if(!user){
            return res.status(200).send({
                success : false,
                message : "User doesnot exist",
            })
        }
        if(user.role!==1){
            return res.status(200).send({
                success : true,
                message : "User is not an admin",
            })
        }else{
            next();
        }
    }catch(error){
     //   console.log(error);
        res.status(200).send({
            success : true,
            message : "server error in isAdmin middleware",
            error,
        })
    }
}

const signInMiddleware = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).send({
                success : false,
                message : "Invalid token or token not found",
            })
        }
        const decode = jwt.verify(token,process.env.secretkey);
        const id = decode._id;
        const user = await usermodel.findById(id);
        req.user = user;//_id
        next();
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Serevr error in middleware",
            error,
        })
    }
}

module.exports = {requireSignIn,isAdmin,signInMiddleware};


