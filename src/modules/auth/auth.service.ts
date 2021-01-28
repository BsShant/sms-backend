import UserModel from '../users/user.model'
import * as service from './../users/user.service';

import * as bcrypt from 'bcrypt'
const saltRounds = 10;
const jwt = require('jsonwebtoken');

export const createToken = (data) => {
	let token = jwt.sign(
		{ name: data.username, _id: data._id, role: data.role },
		process.env.jwtSECRET,
		{ expiresIn: '24h' }
	);
	return token;
}

export const create = async (userData) => {
	const user = await service.checkExistingEmailOrUsername(
		userData.username,
		userData.email
	);
	return new Promise(function (resolve, reject) {
		if (user) {
			reject({
				msg: 'User is already exists',
			});
		} else {
			bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
				if (err) {
					return reject(err);
				}
				bcrypt.hash(userData.password, salt, function (err: any, hash: any) {
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

export const log = (userData: any) => {
	return new Promise(function (resolve, reject) {
		UserModel.findOne({ username: userData.username }).select("+password").exec(function (
			err: any,
			user: any
		) {
			if (err) {
				return reject(err);
			}
			if (user) {
				bcrypt.compare(
					userData.password,
					user.password,
					function (err: any, result: any) {
						if (err) {
							return reject(err);
						}
						if (result) {
							let token = createToken(user);
							return resolve({
								success: result,
								username: user.username,
								email: user.email,
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
