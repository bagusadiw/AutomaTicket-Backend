//import connection to db
const Events = require('../models').events
const Users = require('../models').users
const Orders = require('../models').orders

exports.index = (req, res) => {
    Orders.findAll({
        include:[
            {model: Events, as:"orderedEvent"} 
        ]
    })
    .then(orders=>res.send(orders))
    .catch(err => res.send(err))
}

exports.orderByUser = (req, res) => {
    Orders.findAll({
      include:[
        {model: Users, attributes: ['id', 'name', 'email', 'phone'],as:"orderedByUser"}, 
        {model: Events, as:"orderedEvent"}
      ],
      where:{idUser: req.params.id}
    })
    .then(orders=>res.send(orders))
    .catch(err => res.send(err))
}

exports.approved = (req, res) => {
    Orders.findAll({
      include:[
        {model: Users, attributes: ['id', 'name', 'email', 'phone'],as:"orderedByUser"}, 
        {model: Events, as:"orderedEvent"}
      ],
      where:{idUser: req.params.id, status: "APPROVED"}
    })
    .then(orders=>res.send(orders))
    .catch(err => res.send(err))
}

// exports.show = (req, res) => {
//     Orders.findOne({
//         include:[
//             {model: Users, attributes: ['name', 'username', 'email'], as:"orderByUser"}, 
//             {model: Categories, as:"articleCategories"},
//             {model: Orders, as:"articleorders"}
//         ], 
//         where: {id: req.params.id}
//     })
//     .then(orders=>res.send(orders))
//     .catch(err => res.send(err))
// }

exports.store = (req, res) => {
    Orders.create(req.body)
    .then(orders=>{
    	res.send({
    		orders
    	})
    })
    .catch(err => res.send(err))
}

exports.update = (req, res) => {
    Orders.update(req.body, 
        {where: {
        id: req.params.id
    }})
    .then(orders=>{
    	res.send({
    		orders
    	})
    })
    .catch(err => res.send(err))
}

// exports.delete = (req, res) => {
//     Orders.destroy({
//     	where: {id: req.params.id}
//     })
//     .then(orders=> {
//     	res.send({
//     		orders
//     	})
//     })
//     .catch(err => res.send(err))
// }