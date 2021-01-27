import { Request, Response, } from "express"


// export const register = (req: Request, res: Response, next: Function) => {
// 	const userData = req.body;
// 	UserService.insert(userData)
// 		.then(function (data) {
// 			res.json(data);
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 			next(err);
// 		});
// }

// export const login = (req: Request, res: Response, next: Function) => {
// 	UserService.findOne(req.body)
// 		.then(function (data) {
// 			res.json(data);
// 		})
// 		.catch(function (err) {
// 			next(err);
// 		});
// }
export const hello = (req: Request, res: Response, next: Function) => {
	res.json("hello")
}
