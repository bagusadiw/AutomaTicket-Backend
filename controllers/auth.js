const jwt = require('jsonwebtoken')
const models = require('../models')
const Users = models.users

exports.login = (req, res) => {
	
	const username = req.body.username;
	const password = req.body.password;
	Users.findOne({
		where: {
			username,
			password
		}
	})
	.then(users => {
		if (users) {
			const token = jwt.sign({ userId: users.id }, 'shiroyawn');
			res.send({
				users : {id: users.id, name: users.name, email: users.email, phone: users.phone, username: users.username },
				token,
				message: users.message
			})
		} else {
			res.send({
				error: true,
				message: "wrong email or password"
			});
		}
	})
	.catch(err => res.send(err))
}

exports.register = (req, res) => {
		console.log(req.body)
    Users.create(req.body)
    .then(users=>{
    	const token = jwt.sign({ userId: users.id }, 'shiroyawn');
    	res.send({
    		users : {id: users.id, username: users.username },
    		token,
    		message: 'success'
    	})
    })
    .catch(err => res.send(err))
}