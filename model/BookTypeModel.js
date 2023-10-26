const {Sequelize, sequelize} = require('../config/db')

const BookTypeModel = sequelize.define('book_type', {
    typeName: {
        type: Sequelize.STRING,
        field: 'type_name',
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

sequelize.sync({force: false})

module.exports = BookTypeModel