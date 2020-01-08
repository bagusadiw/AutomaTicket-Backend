//import connection to db
const Users = require('../models').users

exports.index = (req, res) => {
    Users.findAll().then(users=>res.send(users))
}

exports.show = (req, res) => {
    Users.findOne({
        attributes: ['id','name', 'phone', 'email', 'password'],
        where: {id: req.params.id}
    }).then(users=>res.send(users)).catch(err => res.send(err))
}


// exports.favorites = (req, res) => {
//     Users.findOne({
//         where: {id: req.params.id}
//     }).then(users=>res.send(users)).catch(err => res.send(err))
// }