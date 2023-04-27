const jwt=require('jsonwebtoken')
const  generateAuthToken=function(data){
    data=JSON.stringify(data)
    const token=jwt.sign(data,"REBULOGINTOKENFORBROWSER",{
        // expiresIn:"30d",
    });
    return token
}
module.exports=generateAuthToken;