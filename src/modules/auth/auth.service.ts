import { IUserWithUserNameAndPassword } from './../users/user.Interface';
import UserModel from '../users/user.model'
import * as service from './../users/user.service';
import * as bcrypt from 'bcrypt'
import *  as jwt from 'jsonwebtoken'
import { IUser } from './../users/user.model';

const saltRounds = 10;

export const createToken = (data: IUser) => {
	let token = jwt.sign(
		{ name: data.username, _id: data._id, role: data.role },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '24h' }
	);
	return token;
}

export const create = async (userData: IUser) => {
	const user: IUser = await service.checkExistingEmailOrUsername(userData.username, userData.email);
	return new Promise((resolve, reject) => {
		if (user) {
			reject({ msg: 'User Already Exists' });
		} else {
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(userData.password, salt);
			userData.password = hash;
			var newUser = new UserModel(userData);
			newUser.save(function (err, done) {
				if (err) return reject(err);
				return resolve(done);
			});

		}
	});
};

export const login = (userData: IUserWithUserNameAndPassword) => {
	return new Promise(function (resolve, reject) {
		UserModel.findOne({ username: userData.username }).select("+password").exec(function (err: any, user: IUser) {
			if (err) return reject(err);
			if (user) {
				const result: boolean = bcrypt.compareSync(userData.password, user.password);
				if (result) {
					let token = createToken(user);
					return resolve({
						username: user.username,
						email: user.email,
						accessToken: token,
					});
				}
				reject({ msg: 'Invalid Data' })
			}
		});
	});
}
