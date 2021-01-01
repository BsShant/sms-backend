const users = require('./userList');
const userService = require('./auth.service');

const loginUser= async(req,res)=>{
    const loginInfo = req.body;
    const user = await userService.checkUser(loginInfo)
    console.log(user)
    res.json(user)

    // const {userName,password}= req.body;
    // const validUser= users.find((user)=>{
    //     return user.userName === userName && user.password === password
    // })
    // if(validUser){
    //     res.json(validUser)
    // }
    // res.json("Invalid User")
}
const registerUser= async(req,res)=>{
    const registerInfo = req.body;
    const user = await userService.createUser(registerInfo)
    console.log("user status", user)
    if(user){
        res.json(user)
    }
    res.json("failed")

}
module.exports={
    loginUser,
    registerUser
};