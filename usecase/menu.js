// import models
const {Menu} = require("../models")

module.exports = {
    getListMenu: async (filters) => {
        let options = {}
        if (typeof filters !== "undefined" || filters !== null) {
            options.where = filters
        }
        let menu = []

        // error handling
        try{
            menu = await Menu.findAll(options)
        } catch (e) {
            console.log(e)
        }

        return menu
    },

    getMenuByID: async (id) => {
        let menu = null
        try{
            menu =  await Menu.findOne({
                where: {id: id}
            })
        } catch (e) {
            console.log(e)
        }

        return menu
    }

}