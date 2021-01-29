
import { Request, Response, NextFunction } from "express"
import * as service from './auth.service'

export const register = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body)
	const userData = req.body;
	service.create(userData)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
}

export const login = (req: Request, res: Response, next: NextFunction) => {
	service.login(req.body)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
}
export const hello = (req: Request, res: Response, next: NextFunction) => {
	res.json("hello")
}
