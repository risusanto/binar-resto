// import models
const {User} = require("../models")

module.exports = {
    getUserByUsername: async (username) => {
        let user = null
        try{
            user = await User.findOne({
                where: {username: username}
            })
        } catch (e) {
            console.log(e)
        }
        return user
    },
    getUserByUserID: async (id) => {
        let user = null
        try{
            user = await User.findOne({
                where: {id: id}
            })
        } catch (e) {
            console.log(e)
        }
        return user
    },
    createUser: async (user) => {
        let is_success = false
        try{
            user = await User.create(user)
            is_success = true
        } catch (e) {
            console.log(e)
        }
        return {
            is_success: is_success,
            user: user
        }
    }
}