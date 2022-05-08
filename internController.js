
const interModel = require("../Models/interModel")
const collegeModel = require("../Models/collegeModel")


const createIntern =  async function(req,res){

    try {
       let data = req.body
       const {name,mobile,isDeleted,email,collegeId} = data
       if(!name)    return res.status(400).send({status:false, msg:"Name is required..................."})

       if(!mobile)    return res.status(400).send({status:false, msg:"mobile is required..................."})

       if(!email)    return res.status(400).send({status:false, msg:"email is required..................."})

       if(!collegeId)    return res.status(400).send({status:false, msg:"collegeId is required..................."})
       
       let savedCollege = await interModel.create(data)
       return res.status(201).send({status:true,msg : savedCollege})

    } catch (error) {
        console.log(error.message)
         res.status(500).send({msg:error.message})
        
    }
}

const  getInter = async function (req,res){
    try{
        
        let name = req.query.name
        
        if (!name) return res.status(400).send({msg:"please enter college name"})
        let savedCollege = await collegeModel.findOne({name:name})   //.select({isDeleted:0,createdAt:0,updatedAt:0,__v:0,_id:0})
        console.log(savedCollege)
        let collegeId= savedCollege._id
        console.log(collegeId)
        
        
        const savedIntern = await interModel.find({collegeId:collegeId}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0,collegeId:0})
        
       
        return res.status(200).send({status:true,data: {name:savedCollege.name,fullName:savedCollege.fullName,logoLink:savedCollege.logoLink,Interns:savedIntern}})
        
    }catch(error){
        console.log(error.message)
        res.status(500).send({status:false,msg:error.message})
    }
}



module.exports.createIntern = createIntern
module.exports.getInter = getInter
