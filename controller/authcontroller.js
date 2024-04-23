const usermodel = require("../model/usermodel");
const { hashpassword, comparepassword } = require("../Helper/authHelper");
const jwt = require("jsonwebtoken");
const { createSearchIndex } = require("../model/ClinicSchema");
const { response } = require("express");
const validator = require("validator");
const { transporter } = require("../config/emailConfig");
const dotenv = require("dotenv");
dotenv.config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const registercontroller = async (req, res) => {
  console.log("welcome to register controller");
  try {
    const { name, email, password, phoneno, favsports, role } = req.body;
    //validation
    if (!name) {
      return res.status(401).send({ message: "Name is not defined" });
    }
    if (!email) {
      return res.status(401).send({ message: "Email is not defined" });
    }
    if (!password) {
      return res.status(401).send({ message: "Password is not defined" });
    }
    if (!phoneno) {
      return res.status(401).send({ message: "Phoneno is not defined" });
    }
    //check if existing user
    if (!validator.isEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Please enter valid email address",
      });
    }
    const user = await usermodel.findOne({ email: email });
    if (user) {
      return res.status(200).send({
        success: true,
        message: "User Already exists",
        user,
      });
    }
    //user is not existing
    const hashedPassword = await hashpassword(password);
    const users = new usermodel({
      name,
      email,
      password: hashedPassword,
      phoneno,
      favsports,
      role,
    });
    const newuser = await usermodel.insertMany([users]);
    return res.status(201).send({
      //201 represented user created message
      success: true,
      message: "User created Successfully",
      newuser,
    });
  } catch (error) {
 //   console.log(error);
    res.status(500).send({
      success: false,
      message: "Register is failed due to server error",
      error,
    });
  }
};

const logincontroller = async (req, res) => {
  console.log("welcome to login controller");
  try {
    console.log("welcome to try block");
    const { email, password } = req.body;
    //validation
    if (!email) {
      return res.status(404).send({ message: "email is not defined" });
    }
    if (!password) {
      return res.status(404).send({ message: "password is not defined" });
    }
    //userexist or not
    const User = await usermodel.findOne({ email });
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    }
    //user does exist
    const existingPassword = User.password;
    const isMatch = await comparepassword(password, User.password);
    if (!isMatch) {
      console.log("password is not matching");
      return res.status(401).send({
        success: false,
        message: "Password is not matching",
      });
    }
    //password is matching right---I have to genarate a token by the help of jwt token
    const token = await jwt.sign({ _id: User._id }, process.env.secretkey, {
      expiresIn: "7d",
    });
    console.log("USer successfully logged in");
    return res.status(200).send({
      success: true,
      message: "Successfully signed in",
      user: {
        _id: User._id,
        name: User.name,
        email: User.email,
        password: User.password,
        phoneno: User.phoneno,
        favsports: User.favsports,
        role: User.role,
      },
      token,
    });
    //  console.log("Logincontroller is done and dusted")
  } catch (error) {
 //   console.log(error);
    res.status(200).send({
      success: false,
      message: "login failed due to server error",
      error,
    });
  }
};

const sendpasswordresetemailcontroller = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await usermodel.findOne({email : email});
    const token = jwt.sign({_id : user._id},process.env.secretkey,{expiresIn : "10m"});
    const link = `${process.env.FRONTEND_URL}/resetpassword/${token}`;
   // console.log(link)
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "Forgot Password Email", // Subject line
      text: "This link is valid for 10min", // plain text body
      html: `<a href=${link}>Click Here</b>`, // html body
    });
    //console.log(info.messageId)
    return res.status(200).send({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
  //  console.log(error);
    return res.status(500).send({
      success: true,
      message: "User is not registered",
      error,
    });
  }
};

const passwordresetcontroller = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const decoded = await jwt.verify(token, process.env.secretkey);
    const user = await usermodel.findById(decoded._id);
    if (!user) {
      return res.status(500).send({
        success: true,
        message: "User is not registered",
      });
    }
    await usermodel.findByIdAndUpdate(
      decoded._id,
      { password: await hashpassword(password) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      message: "User is not registered",
      error 
    });
  }
};
//controller for testing purpose
const testcontroller = (req, res) => {
  try {
    const message = " Hey welcome to testcontroller";
    res.status(200).send({
      success: true,
      message: message,
    });
  } catch (error) {
   // console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error in testcontroller",
      error,
    });
  }
};

const testAdmincontroller = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Admin successfully",
    });
  } catch (error) {
  //  console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error in testadmin function",
    });
  }
};

module.exports = {
  registercontroller,
  logincontroller,
  testcontroller,
  testAdmincontroller,
  sendpasswordresetemailcontroller,
  passwordresetcontroller,
};

//x contains ---- _id  : getuser...----- user verify if the user is admin or not
//iat : token address
//exp : token address
