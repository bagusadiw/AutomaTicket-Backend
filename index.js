const express = require('express')
const Sequelize = require('sequelize');
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
require("express-group-routes")

//use express in app variable
const app = express()
const port = 5000

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
	
	router.get('/categories', Categories.index) // 1
	router.get('/events', Events.index)

	router.get('/category/:id/events', Events.eventsByCategory) // 2

	router.post('/login', Auth.login)//3
	router.post('/register', Auth.register)//4
	router.get('/event/:id', Events.show) // 6

	router.get('/user/:id', authenticated, Users.show) // 7
	router.get('/user/:id/favorites', authenticated, Favorites.favorites) // 7

	router.get('/orders', Orders.index) // 8
	router.post('/order', authenticated, Orders.store) //6
	router.get('/user/:id/orders', authenticated,Orders.orderByUser) // 8
	router.put('/order/:id', Orders.update) // 8
	router.get('/order/:id/approved', authenticated, Orders.approved) // 8

	router.get('/user/:id/events', authenticated, Events.eventsByUser) // 9 my ticket
	
	router.post('/event', authenticated, Events.store) // 10
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
