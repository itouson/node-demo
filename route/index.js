module.exports = function (app) {
    app.use('/book', require('./book'))
    app.use('/bookType', require('./bookType'))
}