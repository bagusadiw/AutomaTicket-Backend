//import connection to db
const Categories = require('../models').categories
const events = require('../models').events

exports.index = (req, res) => {
    Categories.findAll().then(categories=>res.send(categories))
}