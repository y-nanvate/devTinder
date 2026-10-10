const validator = require("validator")

const validateSignUpdate= (req)=>{
    const { firstName, lastName, emailId, password}= req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Name is not Valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("password not valid")
    }

}

// const validEditUserData=(req)=>{

//     const validEditUserData=["firstName", "lastName"]

// const isAllowedUserFiled= Object.keys(req.body).every((filds)=> validEditUserData.includes(filds))

// return isAllowedUserFiled;
// }
const validEditUserData = (req) => {
  const allowedFields = ["firstName", "lastName"];
  const fields = Object.keys(req.body || {});

  return fields.length > 0 && fields.every((field) => allowedFields.includes(field));
};

module.exports= {validateSignUpdate,
    validEditUserData,
}