const express = require('express')
const router = express.Router()

const BookModel = require('../model/BookModel')
const BookTypeModel = require('../model/BookTypeModel')

const {Op} = require("sequelize")
const {sequelize} = require("../config/db")

router.get('/save', (req, res) => {
    BookModel.create({
        name: 'Rick And Morty',
        author: 'unknow',
        price: 20,
        typeId: 1
    }).then(r => {
        res.send("success")
    }).catch(err => {
        res.send("fail")
    })

    let books = [
        {name: 'book1', author: 'a1', price: 20, typeId: 1},
        {name: 'book2', author: 'a2', price: 50, typeId: 2},
        {name: 'book3', author: 'a3', price: 30, typeId: 3},
        {name: 'book4', author: 'a4', price: 60, typeId: 2},
        {name: 'book5', author: 'a5', price: 40, typeId: 1},
    ]

    BookModel.bulkCreate(books)

})

router.get('/findAll', (req, res) => {
    BookModel.findAll(
        {
            attributes: ['id', 'name', 'price'],
            where: {
                //id: [10, 11]
                //name: {[Op.like]: '%And%'}
            },
            order: [['price', 'DESC'],['id', 'ASC']]
        }
    ).then(r => {
        res.json({
            code: 200,
            msg: 'success',
            data: r
        })
    }).catch(err => {
        res.json({
            msg: 'err',
            data: []
        })
    })
})

router.post('/update', (req, res) => {
    BookModel.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(r => {
        res.json({
            data: r
        })
    })
})

router.get('/delete/:id', (req, res) => {
    BookModel.destroy({
        where: {
            id: req.params.id
        }
    }).then(r => {
        res.json({
            data: r
        })
    })
})

router.get('/listAll', (req, res) => {
    BookModel.findAll({
        attributes: ['name', 'author'],
        include: [{
            model: BookTypeModel,
            as: 'bookType',
            attributes: ['typeName']
        }],
        raw: true
    }).then(r => {
        res.json({
            data: r
        })
    }).catch(err => {
        console.log(err)
    })

})

router.post('/addBook', (req, res) => {
    sequelize.transaction(async t => {
        await BookModel.create({
            name: 'testTran1',
            author: 'author1',
            typeId: 1
        }, {transaction: t})
        //throw new Error()
        await BookModel.create({
            name: 'testTran2',
            author: 'author2',
            typeId: 2
        }, {transaction: t})
    }).then(r => {
            res.json({msg: 'success'})
        }
    ).catch(err => {
        res.json({msg: 'rollback'})
    })

})

module.exports = router