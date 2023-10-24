const Sequelize = require('sequelize')

let sequelize = new Sequelize('demo', 'root', 'root', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

//test connection
sequelize.authenticate().then(() => {
    console.log('conn db success')
}).catch((err) => {
    console.error(err)
    throw err
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}