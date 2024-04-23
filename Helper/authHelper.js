const bcrypt = require('bcrypt');

const hashpassword = async(password) =>{
    try{
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltrounds);
        return hashedPassword;
    }catch(error){
        console.log(error);
        console.log("PLease check the error");
    }
};
const comparepassword = async(password,hashpassword)=>{
    const isMatch = await bcrypt.compare(password,hashpassword);
    if(isMatch){
        return true;
    }else return false;
}

module.exports = {hashpassword,comparepassword};

