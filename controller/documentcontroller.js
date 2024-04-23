const docmodel = require('../model/doc');
const cloudinary = require('cloudinary');

const addDocumentcontroller = async(req,res)=>{
    try{
        const person_id = req.user._id;
        const {name,date,visitdate,description} = req.body;
        if(!name){
            return res.status(200).send({message : "name is not defined"});
        }
        if(!date){
            return res.status(404).send({message : "Date is not defined"});
        }
        if(!visitdate){
            return res.status(404).send({message : "vistdate is not defined"});
        }
        if(!description){
            return res.status(404).send({message : "Description is not defined"});
        }
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(404).send({
                success : false,
                message : 'File Not found',
            })
        }

        //console.log(req.files);
        
        const {file} = req.files;
      //  console.log(file);
        if(!file){
            return res.status(404).send({
                success : false,
                message : 'documents not found',
            })
        }

        const allowedformats = ["image/png", "image/jpeg", "image/webp","image/jpg"];
        if(!allowedformats.includes(file.mimetype)){
            return res.status(404).send({
                success : false,
                message : 'File format Not allowed'
            })
        }
        const cloudinaryresponse = await cloudinary.uploader.upload(
            file.tempFilePath,
        )

        if(!cloudinaryresponse){
            return res.status(200).send({
                success : false,
                message : "cloudinary response not found",
            })
        }
        const document = await new docmodel({
            person_id : person_id,
            name : name,
            date : date,
            visitdate : visitdate,
            description : description,
            file : {
                public_id : cloudinaryresponse.public_id,
                url : cloudinaryresponse.secure_url
            }
        }).save();

        return res.status(200).send({
            success : true,
            message : "File saved successfully",
            document,
        })
    }catch(error){
   //     console.log(error);
        res.status(404).send({
            success : true,
            message : "Error is AddDocumet controller",
            error,
        })
    }
};

const deleteDocumentcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const doc = await docmodel.findByIdAndDelete(id);
        if(!doc){
            return res.status(404).send({
                success : true,
                message : "Document not found",
            })
        }

        const person_id = doc.person_id;
        return res.status(200).send({
            success : true,
            message : "Document Deleted successfully",
            doc,
        });
        
    }catch(error){
   //     console.log(error);
        return res.status(404).send({
            success : true,
            message : "Error in DeleteDocumentcontroller",
            error,
        })
    }
};

const getdoccontrollerbyid = async(req,res)=>{
    try{
        const id = req.user._id;
        const documents = await docmodel.find({person_id : id});
        return res.status(200).send({
            success : true,
            message : "Successfully We have got all the documents",
            documents,
        });    
    }catch(error){
   //     console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error Successfully received",
            error,
        })
    }
};

module.exports = {addDocumentcontroller,deleteDocumentcontroller,getdoccontrollerbyid};