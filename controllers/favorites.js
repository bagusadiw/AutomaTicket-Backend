const Events = require('../models').events
const Users = require('../models').users
const Favorites = require('../models').favorites
const Categories = require('../models').categories

exports.favorites = (req, res) => {
    Favorites.findAll({
        include:[
            {model: Events, as:"favoritedEvent"}
        ],
        where:{idUser: req.params.id}
    })
    .then(events=>res.send(events))
    .catch(err => res.send(err))
}

exports.show = (req, res) => {
    Favorites.findOne({
      where: {
      	idUser: req.body.idUser,
      	idEvent: req.body.idEvent
      }
    })
    .then(favorites=>{
    	if (favorites) {
				res.send({
					favorited: true
				})
			} else {
				res.send({
					favorited: false
				});
			}
    })
    .catch(err => res.send(err))
}

exports.store = (req, res) => {
    Favorites.create(req.body)
    .then(favorites=>{
    	res.send({
    		favorited: true
        })  
    })
    .catch(err => res.send(err))
}

exports.delete = (req, res) => {
    Favorites.destroy({
    	where: {
    		idUser: req.body.idUser,
    		idEvent: req.body.idEvent
    	}
    })
    .then(favorites=> {
    	res.send({
    		favorited: false
    	})
    })
    .catch(err => res.send(err))
}