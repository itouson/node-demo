const Sequelize = require('sequelize')

const sequelize = new Sequelize('demo', 'root', 'root', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
