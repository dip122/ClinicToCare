const medmodel = require('../model/Medicine');
const addmedcontroller = async(req,res)=>{
    try{
        const person_id = req.user._id;
        const {name,type,time} = req.body;
        if(!name){
            return res.status(404).send({message: 'Name is not defined'});
        }
        if(!type){
            return res.status(404).send({message: 'Type is not defined'});
        }
        if(!time){
            return res.status(404).send({message: 'Time is not defined'});
        }
        const existing = await medmodel.findOne({person_id,name,type,time});
        if(existing){
            return res.status(404).send({
                success : false,
                message : "Already existing",
            })
        }
        const newmed = await new medmodel({
            person_id : person_id,
            name : name,
            type : type,
            time : time,
        }).save();

        return res.status(200).send({
            success : true,
            message : "Successfully medicine added",
            newmed,
        });
        
    }catch(error){
  //      console.log(error);
        return res.status(500).send({
            success : false,
            message : "server side error in case of addmedcontroller",
            error,
        })
    }
};

const deletemedcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await medmodel.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "Deletemedcontroller",
            result,
        })
    }catch(error){
  //      console.log(error);
        res.status(500).send({success : false,
        message : "Server error in deletemedcontroller",
        error,})
    }
};

const getmedcontroller = async(req,res)=>{
    try{
        const id = req.user._id;
        const result = await medmodel.find({person_id : id});
        return res.status(200).send({
            success : true,
            message : "Get medicine controller",
            result,
        })
    }catch(error){
    //    console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in getmedcontroller",
            error,
        })
    }
}

module.exports = {addmedcontroller,deletemedcontroller,getmedcontroller}