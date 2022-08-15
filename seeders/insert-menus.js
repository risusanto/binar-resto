module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Menus", [
            {
                name: "Bakso",
                category: "makanan",
                price: 25000,
                stock: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Nasi Goreng",
                category: "makanan",
                price: 10000,
                stock: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Es Teh",
                category: "minuman",
                price: 2000,
                stock: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Menus", null, {})
    }
}