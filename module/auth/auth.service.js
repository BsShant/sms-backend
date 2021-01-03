const userModel = require('../user/user.model');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (data) =>{
    const {name, password, email} = data;    
        try{
            const passwordHash = await bcrypt.hash(password, saltRounds)
            data.password= passwordHash
             const newUser= await userModel.create(data)  
             //console.log("user status", newUser)
             return newUser;         
        }
        catch(err){
            console.log("error creating user", err)
            
        }
        

}
const checkUser = async(data) =>{
    const {password, name} = data;
    
        try{
            const user = await userModel.findOne({name})
            console.log("findOne",user)
            if(user){
                const checkPassword = await bcrypt.compare(password, user.password)
                if(checkPassword){
                    return user;
                }
                else{
                    return 'password did not match';
                }
        }
        else{
            return 'user not found';
        }
    }catch(err){
            console.log(err)
        }
}

module.exports={
    checkUser,
    createUser
}