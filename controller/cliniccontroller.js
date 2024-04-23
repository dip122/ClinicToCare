
const { response } = require('express');
const clinicmodel = require('../model/ClinicSchema');
const reviewmodel = require('../model/reviewmodel');
const usermodel = require('../model/usermodel');
const cliniccontroller = async(req,res)=>{
    try{
        const {name,doctor_name,phoneno,address,days} = req.body;
        const person_id = req.user._id;
        //validation 
        if(!name){
            return res.status(404).send({message:"name is not defined"});
        }
        if(!doctor_name){
            return res.status(404).send({message:"doctor_name is not defined"})
        }
        if(!phoneno){
            return res.status(404).send({message:"phoneno is not defined"});
        }
        if(!address){
            res.status(404).send({message:"address is not defined"});
        }
        if(!days){
            res.status(404).send({message : "days are not defined"});
        }
        if(!person_id){
            return res.status(404).send({message:"NO user is logged in"});
        }

        //existing clinic
        const clinic = await clinicmodel.find({name,doctor_name,phoneno,address});
        if(clinic.length>0){
            console.log('I am here');
            console.log(clinic);
            return res.status(404).send({
                success : true,
                message : "Clinic ALready added into the database",
            })
        }
        const newclinic = await new clinicmodel({
            person_id,
            name,
            doctor_name,
            phoneno,
            address,
            days,
        }).save();

        return res.status(200).send({
            success : true,
            message : "clinic added successfully",
            newclinic,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "cliniccontroller is good enough",
            error,
        })
    }
};

const getallclinics = async(req,res)=>{
    try{
        const id = req.user._id;
        console.log(id);
        const allclinic = await clinicmodel.find({person_id : id});
        res.status(200).send({
            success : true,
            message : "All cinis below",
            allclinic,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Server Side error",
            error,
        })
    }
}

const deletecliniccontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const getClinic = await clinicmodel.findByIdAndDelete(id);
        res.status(200).send({
            success : true,
            message : "Successfully deleted",
            getClinic,  
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Server Side error has occured",
            error,
        })
    }
};

//testcontroller for testing purpose....very good testing library
const testcontroller = (req,res) =>{
    try{
        return res.status(200).send({
            success : true,
            message :"Test controller is successfully executed",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : true,
            message : "testcontroller server error",
            error,
        })
    }
};

module.exports = {cliniccontroller,testcontroller,getallclinics,deletecliniccontroller};































