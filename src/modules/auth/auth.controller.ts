import { Request, Response, NextFunction } from "express"

import UserService from './auth.service'

export const register = (req: Request, res: Response, next: NextFunction) => {
	const userData = req.body;
	UserService.insert(userData)
		.then(function (data) {
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			next(err);
		});
}

export const login = (req: Request, res: Response, next: NextFunction) => {
	UserService.findOne(req.body)
		.then(function (data) {
			res.json(data);
		})
		.catch(function (err) {
			next(err);
		});
}