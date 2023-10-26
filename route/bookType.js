const express = require('express')
const router = express.Router()

const BookTypeModel = require('../model/BookTypeModel')

router.get('/save', (req, res) => {

    let bookTypes = [
        {typeName: 'fiction'},
        {typeName: 'edu'},
        {typeName: 'it'}
    ]

    BookTypeModel.bulkCreate(bookTypes).then(r => {
        res.send('success')
    })

})

module.exports = router