const bcrypt = require("bcrypt")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                name: "Admin",
                username: "admin",
                is_admin: true,
                password: bcrypt.hashSync('123456', 10),
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {})
    }
}