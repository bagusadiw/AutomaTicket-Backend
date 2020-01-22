const express = require('express')
const Sequelize = require('sequelize');
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
require("express-group-routes")

//use express in app variable
const app = express()
const port = process.env.PORT || 5000

// jwt middleware
const { authenticated } =require('./middleware')

//import controllers
const Categories = require('./controllers/categories')
const Users = require('./controllers/users')
const Events = require('./controllers/events')
const Favorites = require('./controllers/favorites')
const Orders = require('./controllers/orders')
const Auth = require('./controllers/auth')

app.use(bodyParser.json())
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.group("/api/v1", (router) => {
	
	router.get('/categories', Categories.index)
	router.get('/events', Events.index)

	router.get('/category/:id/events', Events.eventsByCategory) 

	router.post('/login', Auth.login)
	router.post('/register', Auth.register)
	router.get('/event/:id', Events.show)

	router.get('/user/:id', authenticated, Users.show)
	router.get('/user/:id/favorites', authenticated, Favorites.favorites) 

	router.get('/orders', Orders.index)
	router.post('/order', authenticated, Orders.store) 
	router.get('/user/:id/orders', authenticated,Orders.orderByUser)
	router.put('/order/:id', Orders.update) 
	router.get('/order/:id/approved', authenticated, Orders.approved)

	router.get('/user/:id/events', authenticated, Events.eventsByUser) 
	
	router.post('/event', authenticated, Events.store)
	router.put('/event/:id', authenticated, Events.update) 
	router.delete('/event/:id', authenticated, Events.delete) 

	router.get('/users', authenticated, Users.index)

	router.post('/favorites/show', Favorites.show)
	router.post('/favorites/store', authenticated, Favorites.store)
	router.post('/favorites/delete', authenticated, Favorites.delete)
})


//create the homepage route
app.get('/', (req, res) => {
    //res means, response, and it send string "Hello Express!" to the API
    res.send('Batch 13 Ganteng Semua')
})    

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`))
