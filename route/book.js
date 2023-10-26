const express = require('express')
const router = express.Router()

const BookModel = require('../model/BookModel')
const BookTypeModel = require('../model/BookTypeModel')

const {Op} = require("sequelize")
const {sequelize} = require("../config/db")

router.get('/save', (req, res) => {
    BookModel.create({
        name: 'Rick And Morty - The fifth season',
        author: 'unknow',
        price: 20,
        typeId: 1
    }).then(r => {
        res.send("success")
    }).catch(err => {
        res.send("fail")
    })

    async function saveMany(books) {
        try {
            await BookModel.bulkCreate(books);
            console.log("bulk success");
        } catch (error) {
            console.log("bulk \n" + error);
        }
    }

    var books = [
        {name: 'book1', author: 'unknow', price: 20, typeId: 1},
        {name: 'book2', author: 'unknow', price: 20, typeId: 2},
        {name: 'book3', author: 'unknow', price: 20, typeId: 3},
        {name: 'book4', author: 'unknow', price: 20, typeId: 4},
        {name: 'book5', author: 'unknow', price: 20, typeId: 5},
    ]
    saveMany(books)


})

router.get('/findAll', (req, res) => {
    BookModel.findAll(
        {
            attributes: ['name', 'author'],
            where: {
                //id : 3,
                name: {[Op.like]: '%And%'}
            }
        }
    ).then(r => {
        res.json({
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
    addBook().then(r => {
        res.json({
            data: r
        })
    }).catch(err =>{})
})

async function addBook() {
    try {
        await sequelize.transaction(async (t) => {
            const book = await BookModel.create({
                name: 'testTran',
                author: 'df',
                typeId: 2
            }, { transaction: t });
            //throw new Error();
            return book;    //
        });

    } catch (error) {
        console.log("rollback\n" + error);
    }
}

module.exports = router