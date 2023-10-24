let Seq = require('../config/db').Sequelize
let seq = require('../config/db').sequelize
let DepartmentModel = require('./department')

const StaffModel = seq.define('staff', {
    sno: {
        type: Seq.INTEGER,
        primaryKey: true
    },
    sname: {
        type: Seq.STRING,
        allowNull: false
    },
    job: {
        type: Seq.STRING
    },
    mgr: {
        type: Seq.INTEGER
    },
    hireDate: {
        type: Seq.DATE
    },
    sal: {
        type: Seq.DECIMAL(7, 2)
    },
    comm: {
        type: Seq.DECIMAL(7, 2)
    },
    depNo: {
        type: Seq.INTEGER,
        field: 'd_no'
    }
}, {
    freezeTableName: true,
    timestamps: false
})

StaffModel.belongsTo(DepartmentModel, {as:'dept', foreignKey:'d_no', targetKey: 'depNo'})

seq.sync({ force: false })

module.exports = StaffModel
