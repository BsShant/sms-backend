const UserModel = require('../users/user.model');
const UserService = require('../users/user.service');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

function createToken(data) {
	let token = jwt.sign(
		{ name: data.username, _id: data._id, role: data.role },
		process.env.jwtSECRET,
		{ expiresIn: '24h' }
	);
	return token;
}

const insert = async (userData) => {
	const user = await UserService.checkExistingEmailOrUsername(
		userData.username,
		userData.email
	);
	return new Promise(function (resolve, reject) {
		if (user) {
			reject({
				msg: 'User is already exists',
			});
		} else {
			bcrypt.genSalt(saltRounds, function (err, salt) {
				if (err) {
					return reject(err);
				}
				bcrypt.hash(userData.password, salt, function (err, hash) {
					if (err) {
						return reject(err);
					}
					userData.password = hash;
					var newUser = new UserModel(userData);
					newUser.save(function (err, done) {
						if (err) {
							return reject(err);
						}
						return resolve(done);
					});
				});
			});
		}
	});
};

function findOne(userData) {
	return new Promise(function (resolve, reject) {
		UserModel.findOne({ username: userData.username }).exec(function (
			err,
			user
		) {
			if (err) {
				return reject(err);
			}
			if (user) {
				bcrypt.compare(
					userData.password,
					user.password,
					function (err, result) {
						if (err) {
							return reject(err);
						}
						if (result) {
							let token = createToken(user);
							return resolve({
								success: result,
								user: user,
								token: token,
								status: 200,
							});
						} else {
							return reject({
								msg: 'Invalid Password',
								status: 400,
							});
						}
					}
				);
			} else {
				return reject({
					msg: 'Invalid Username',
					status: 400,
				});
			}
		});
	});
}
module.exports = {
	insert,
	findOne,
};
