import { Request, Response, NextFunction } from "express"
import * as service from './auth.service'

export const register = (req: Request, res: Response, next: NextFunction) => {
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

// export const login = (req: Request, res: Response, next: Function) => {
// 	UserService.findOne(req.body)
// 		.then(function (data) {
// 			res.json(data);
// 		})
// 		.catch(function (err) {
// 			next(err);
// 		});
// }
export const hello = (req: Request, res: Response, next: NextFunction) => {
	res.json("hello")
}
