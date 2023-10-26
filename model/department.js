let Seq = require('../config/db').Sequelize
let seq = require('../config/db').sequelize

const DepartmentModel = seq.define('department', {
    depNo: {
        type: Seq.INTEGER,
        field: 'dep_no',
        primaryKey: true
    },
    depName: {
        type: Seq.STRING,
        field: 'dep_name',
        allowNull: false
    },
    loc: {
        type: Seq.STRING,
        allowNull: false
    },
    insertTime: {
        type: Seq.DATE,
        field: 'insert_time'
    }
}, {
    freezeTableName: true,
    timestamps: false
})

seq.sync({ force: false })

module.exports = DepartmentModel