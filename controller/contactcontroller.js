const contactmodel = require('../model/contact');

const contactcontroller = async(req,res)=>{
    try{
        const {name,email,phoneno,content} = req.body;
        if(!name){
            return  res.status(404).send({message : "Name is not defined"});
        }
        if(!email){
            return res.status(404).send({message : "Email is not defined"});
        }
        if(!phoneno){
            return res.status(404).send({message : "Phoneno is not defined"});
        }
        if(!content){
            return res.status(404).send({message : "Content is not defined"});
        }
        const contactdetails = await new contactmodel({
            name,
            email,
            phoneno,
            content,
        }).save();

        return res.status(200).send({
            success : true,
            message : "Contact details is updated and sent to admin",
            contactdetails,
        })
    }catch(error){
   //     console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in contactcontroller",
            error,
        })
    }
};

const getcontactcontroller = async(req,res)=>{
    try{
        const getcontact = await contactmodel.find({});
        return res.status(200).send({
            success : true,
            message : "All contacts reveived",
            getcontact,
        })
    }catch(error){
    //    console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in getcontactcontroller function",
            error,
        })
    }
}

const deletecontactcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const deletedcontact = await contactmodel.findByIdAndDelete(id);

        return res.status(200).send({
            success : true,
            message : "Document deleted successfully",
            deletedcontact
        })
    }catch(error){
        return res.status(500).send({
            success : false,
            message : "Server side error in deletecontactcontroller function",
            error,
        })
    }
}

module.exports = {contactcontroller,getcontactcontroller,deletecontactcontroller};