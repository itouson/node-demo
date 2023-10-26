module.exports = function (app) {
    app.use('/book', require('./book'))
}