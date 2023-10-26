const {Sequelize, sequelize} = require('../config/db')
const BookTypeModel = require('./BookTypeModel')

const BookModel = sequelize.define('book', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    typeId: {
        type: Sequelize.INTEGER,
        field: 'type_id',
    }
}, {
    freezeTableName: true,
    timestamps: false
})

BookModel.belongsTo(BookTypeModel, {as: 'bookType', foreignKey: 'typeId', targetKey: 'id'})

sequelize.sync({force: false})

module.exports = BookModel
