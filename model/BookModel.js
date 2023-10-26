const {Sequelize, sequelize} = require('../config/db')

const BookModel = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true

    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {

    },
    typeId: {
        type: Sequelize.INTEGER,
        field: 'type_id',
        allowNull: false
    }
})