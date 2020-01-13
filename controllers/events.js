
//import connection to db
const Events = require('../models').events
const Users = require('../models').users
const Categories = require('../models').categories
const Orders = require('../models').orders
const Favorites = require('../models').favorites
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.index = (req, res) => {
    let condition = {};
    if (
        req.query.title !== undefined 
        && req.query.start_date !== undefined 
        && req.query.end_date !== undefined 
    ){
        condition = {
            title: {
                [Op.like]: `%${req.query.title}%`
            },
            startTime: {
                [Op.gte]: req.query.start_date,
                [Op.lte]: req.query.end_date
            }
        }
    }else if (req.query.title !== undefined){ 
        condition = {
            title: {
                [Op.like]: `%${req.query.title}%`
            }
        }
    } else if (req.query.start_date !== undefined && req.query.end_date !== undefined ){
        condition = {
            startTime: {
                [Op.gte]: req.query.start_date,
                [Op.lte]: req.query.end_date
            }
        }
    }

    Events.findAll({ 
        include:[
            {model: Users, attributes: ['id','name', 'phone', 'email'], as:"eventCreator"},  
            {model: Categories, attributes: ['id', 'name'], as:"eventCategory"}
        ],
        where : condition
    })
    .then(events=>{
         if (events.length !== 0) {
            res.send({
                events,
                notFound: false
            })  
        }else{
            res.send({
                events,
                notFound: true
            })
        }
    })
    .catch(err => res.send(err))
}

exports.eventsByCategory = (req, res) => {
    Events.findAll({
        include:[
            {model: Users, attributes: ['name', 'phone', 'email'], as:"eventCreator"}, 
            {model: Categories, attributes: ['id','name'], as:"eventCategory"}
        ],
        where:{idCategory: req.params.id}
    })
    .then(events=>res.send(events))
    .catch(err => res.send(err))
}

exports.eventsByUser = (req, res) => {
    Events.findAll({
        include:[
            {model: Users, attributes: ['name', 'phone', 'email'], as:"eventCreator"}, 
            {model: Categories, attributes: ['id','name'], as:"eventCategory"}
        ],
        where:{createdBy: req.params.id}
    })
    .then(events=>res.send(events))
    .catch(err => res.send(err))
}

exports.show = (req, res) => {
    Events.findOne({
      include:[
        {model: Users, attributes: ['name', 'phone', 'email'], as:"eventCreator"}, 
        {model: Categories, as:"eventCategory"},
        
      ], 
      where: {id: req.params.id}
    })
    .then(events=>res.send(events))
    .catch(err => res.send(err))
}

exports.store = (req, res) => {
    Events.create(req.body)
    .then(events=>{
    	res.send({
    		events
        })  
    })
    .catch(err => res.send(err))
}

exports.update = (req, res) => {
    Events.update(req.body, { where: { id: req.params.id } })
    .then(events=>{
    	res.send({
            message: "Event Updated",
    		events
    	})
    })
    .catch(err => res.send(err))
}

exports.delete = (req, res) => {
    Events.destroy({
    	where: {id: req.params.id}
    })
    .then(events=> {
    	res.send({
    		message: "Delete Successful",
            events
    	})
    })
    .catch(err => res.send(err))
}