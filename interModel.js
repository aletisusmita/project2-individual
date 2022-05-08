const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const intersModel = new mongoose.Schema({
    name: {
        type: String, require: true, trim: true
    },
   
    email: {
        type: String, trim: true, validate: {
            validator: function (s) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/.test(s)
            },
            Message: props => `${props.value}is not a valid email...............................`
        },
        required: [true, `user email must be require`]
    },
    mobile: {
        type: Number, unique: true,
        // validate: {
        //     validator: function (v) {
        //         return /^\(?([6-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v)                     ///\d{6-9}-\d{3}-\d{4}/.test(v)
        //     },
        //     message: props => `${props.value} is not a valid mobile number.....`
        // },
        // required: [true, 'user mobile number must be required']
    },
   
    collegeId: {
        type: ObjectId, ref: "college"
    },
    
    isdeleated: {
        type: String, default: false
    }

}, { timestamps: true })


module.exports = mongoose.model("interns", intersModel)
