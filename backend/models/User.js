const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique: true
    },
    name:{
        type:String,
        require:true
    },
    phonenumber:{
        type:Number,
        require:true
    },
    passWord:{
        type:String,
        require:true

    }
})

const User=mongoose.model('User',userSchema)
module.exports=User;