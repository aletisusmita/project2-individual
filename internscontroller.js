const interModel = require("../models/internsModel")
const collegeModel = require("../Models/collegeModel")


const createIntern = async function (req, res) {

    try {
        
        let data = req.body
        const { name, mobile, isDeleted, email, collegeName } = data
        if (!name) return res.status(400).send({ status: false, msg: "Name is required..................." })
        if (!mobile) return res.status(400).send({ status: false, msg: "mobile is required..................." })
        if (!email) return res.status(400).send({ status: false, msg: "email is required..................." })
        if (!data.collegeName) return res.status(400).send({ status: false, msg: "collegeName is required..................." })

        let findCollege = await collegeModel.findOne({ name: data.collegeName }).select({ _id: 1 })
        if (!findCollege) return res.status(400).send({ status: false, msg: "Enter a valid college name" })
        data.collegeId = findCollege._id
        delete data.collegeName

        let savedCollege = await interModel.create(data)

        return res.status(201).send({ status: true, msg: savedCollege })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ msg: error.message })

    }
}




const getInter = async function (req, res) {
    try {

        

        let collegeName= req.query.collegeName                                                                    //.search(/i)
        if (!collegeName) return res.status(400).send({ msg: "please enter college name" })

        let savedCollege = await collegeModel.findOne({ name: collegeName }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 1 })


        if (!savedCollege == true) return res.status(404).send({ msg: "No college found " })

        let collegeId = savedCollege._id

        const savedIntern = await interModel.find({ collegeId: collegeId }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, collegeId: 0 })

         savedCollege["Interests"] = savedIntern
        let obj = {...savedCollege,interests:savedIntern}
        //--------------------------------------------------
        if (!savedIntern.length == true) {
            Data = {
                name: savedCollege.name,
                fullName: savedCollege.fullName,
                 logoLink: savedCollege.logoLink,
                interests: "no one has applied in this college"
             }
             return res.status(200).send({ data: Data })
        } else {
            Data = {
               name: savedCollege.name,
                 fullName: savedCollege.fullName,
                logoLink: savedCollege.logoLink,
                 interests: savedIntern
           }
           return res.status(200).send({ data: Data })
         }

        




module.exports.getInter = getInter
module.exports.createIntern = createIntern