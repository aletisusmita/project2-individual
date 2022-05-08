const collegeModel = require("../Models/collegeModel")


const createCollege = async function (req, res) {

    try {
        let data = req.body
        const { name, fullName, isDeleted, logoLink } = data
        if (!name) return res.status(400).send({ status: false, msg: "Name is required..................." })

        if (!fullName) return res.status(400).send({ status: false, msg: "FullName is required..................." })

        if (!logoLink) return res.status(400).send({ status: false, msg: "LogoLink is required..................." })
        
        let savedCollege = await collegeModel.create(data)
        return res.status(200).send({ status: true, msg: savedCollege })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ msg: error.message })

    }
}

module.exports.createCollege = createCollege