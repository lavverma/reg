const userModel  = require("./userModel")



const registerUser = async function(req, res){
try{
    const data  =req.body

    if(Object.keys(data).length == 0){
      return res
      .status(400)
      .send({status : false, message : `Please Provide some details`})
    }
  
    const {fname, lname, email, phone, password} = data
  
    if(!fname){
      return res
      .status(400)
      .send({status : false, message : `First name is required`})
    }
    if(!(/^[a-zA-Z]+$/).test(fname)){
      return res
      .status(400)
      .send({status : false, message : `First name is only alphabets without any space and special character`})
    }
  
    if(!lname){
      return res
      .status(400)
      .send({status : false, message : `Last name is required`})
    }
    if(!(/^[a-zA-Z]+$/).test(lname)){
      return res
      .status(400)
      .send({status : false, message : `Last name is only alphabets without any space and special character`})
    }
  
    if(!email){
      return res
      .status(400)
      .send({status : false, message : `Email is required`})
    }
    if(email.indexOf("@") <= 0 || email.charAt(email.length-4) !== '.'){
      return res
      .status(400)
      .send({status : false, message : `Email is not valid`})
    }

    const matchEmail = await userModel.findOne({email : email})
  
    if(matchEmail){
        return res
        .status(400)
        .send({status : false, message : `Email Id is already Used`})
    }

    if(!phone){
      return res
      .status(400)
      .send({status : false, message : `Phone Number is required`})
    }
  
    if(phone.length !== 10){
      return res
      .status(400)
      .send({status : false, message : `Phone Number has only 10 digits`})
    }
    for(let i  of phone){
      if(!!isNaN(parseInt(i))){
          return res
          .status(400)
          .send({status : false, message : `For Phone Number use only Number even not give any space`})
      }
      }
  
      if(!password){
          return res
          .status(400)
          .send({status : false, message : `Password is required`})
      }
      if(password.length < 8){
          return res
          .status(400)
          .send({status : false, message : `Password should contain minimum 8 character`})
      }
      if(!password.match(/[A-Z]/)){
          return res
          .status(400)
          .send({status : false, message : `Password should contain One or more uppercase letters `})
      }
      if(!password.match(/[a-z]/)){
          return res
          .status(400)
          .send({status : false, message : `Password should contain One or more lowercase letters `})
      }
      if(!password.match(/[0-9]/)){
          return res
          .status(400)
          .send({status : false, message : `Password should contain One or more Number `})
      }
      if(!password.match(/[^A-Za-z0-9]/)){
          return res
          .status(400)
          .send({status : false, message : `Password should contain One or more special character `})
      }
      data.phone = parseInt(phone)

      const userData  = await userModel.create(data)

      return res
      .status(201)
      .send({status : true, data : userData})
}
catch(err){
    return res
    .status(500)
    .send({status : false, message : err.message})
}

}
module.exports = registerUser