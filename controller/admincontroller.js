const usermodel = require('../model/usermodel');
const contactmodel = require('../model/contact')
const getallusercontroller =async(req,res)=>{
    try{
        const users = await usermodel.find({role : 0});
        return res.status(200).send({
            success : true,
            message : "Successfully we have got all users",
            users,
        })
    }catch(error){
  //      console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server error in getallusercontroller",
            error,
        })
    }
};

const contactusroutescontroller = async(req,res)=>{
    try{
        const allcontact = await contactmodel.find({});
        return res.status(200).send({
            success : true,
            message : "Successfully we have got all contacts",
            allcontact,
        })
    }catch(error){
  //      console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server Side error in contactusroutescontroller",
            error,
        })
    }
};

module.exports = {getallusercontroller,contactusroutescontroller}