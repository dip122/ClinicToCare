const reviewmodel = require('../model/reviewmodel');
const addreviewcontroller = async(req,res)=>{
    try{
        const {name,content,ratings} = req.body;
        if(!name){
            return res.status(404).send({message: "Name is not defined"});
        }
        if(!content){
            return res.status(404).send({message: "Content is not defined"});
        }
        if(!ratings){
            return res.status(404).send({message: "Ratings is not defined"});
        }
        const person_id = req.user._id;
        const newreview = await new reviewmodel({
            person_id,
            name,
            content,
            ratings,
        }).save();
        return res.status(200).send({
            success : true,
            messge : "Review is added successsfully",
            newreview,
        })
    }catch(error){
 //       console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in Server of Addreviewcontroller",
            error,
        })
    }
};
const getreviewcontroller = async(req,res)=>{
    try{
        const getreview = await reviewmodel.find({});
        return res.status(200).send({
            success : true,
            message : "All review get",
            getreview,
        })
    }catch(error){
     //   console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server Side error",
            error,
        })
    }
};

const getreviewcontrollerbyid = async(req,res)=>{
    try{
        const id = req.user._id;
    //    console.log(id);
        const getreview = await reviewmodel.find({person_id : id});
        return res.status(200).send({
            success : true,
            message : "Review get successfully",
            getreview,
        });//we have got an array
    }catch(error){
    //    console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server Side error",
            error,
        })
    }
};
const deletereviewcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const deletereview = await reviewmodel.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "Review delete successfully",
            deletereview,
        })
    }catch(error){
   //     console.log(error);
        return res.status(500).send({
            success : true,
            message : "Server Side error",
            error,
        })
    }
}
module.exports = {addreviewcontroller,getreviewcontroller,getreviewcontrollerbyid,deletereviewcontroller};

