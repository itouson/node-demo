const express = require('express')
const app = express()

const DepartmentModel = require('./models/department')
const StaffModel = require('./models/staff')

app.get('/staffs', (req, res) => {
    StaffModel.findAll({
        attributes: ['sno', 'sname', 'sal'],
        include: [{
            model: DepartmentModel,
            as: 'dept',
            attributes: ['dep_name', 'loc']
        }],
        raw: true
    }).then(result => {
        res.json({
            data: result
        })
    }).catch(err => {
        console.log(err)
    })
})

app.listen(8080, () => {
    console.log('server is running')
})