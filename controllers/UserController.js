const {findAllUsers} =require("../database/user")

const getUsers = async (user)=>{
    if(!user.isAdmin){
        throw new Error('Permission Denied')
    }
    const users = await findAllUsers()
    return users
}

module.exports = {getUsers}