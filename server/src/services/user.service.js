const UserModel = require("../models/user.model")
const randomStringGenerator = require("../utilities/hepler")
const bcrypt = require("bcryptjs")
class UserService{
    transformUserData(req, next){
        const data = req.body
        // console.log(data);
        
        data.password = bcrypt.hashSync(data.password)
        data.emailVerified = false
        data.otp = randomStringGenerator(6).toUpperCase()
        data.expiryTime = new Date(Date.now() + 36000000)   //converting 10 mins into ms, 1 min = 3600sec *1000*10
        return data
    }


    async createUser(data){
        try {
            const userObj = new UserModel(data)
            return await userObj.save()
            
        } catch (exception) {
            console.log(exception);
            throw{code:422, message:"User cannot be Registered at this moment"}
        }
    }

    getPublicUserProfile(userObj){
        const {_id, name, email, phone, address, gender, createdAt, updatedAt} = userObj
        return{
            _id, name, email, phone, address, gender, createdAt, updatedAt
        } 
    }


}

module.exports =  new UserService()