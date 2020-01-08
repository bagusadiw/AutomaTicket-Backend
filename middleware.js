// const isLoggedIn = false

// exports.authenticated = (req, res, next) => {
// 	if(isLoggedIn){
// 		next()
// 	}else{
// 		res.send({
// 			messages: "You're not authenticated"
// 		})
// 	}
// }

const jwt = require('express-jwt')

exports.authenticated = jwt ({ secret: 'shiroyawn' })