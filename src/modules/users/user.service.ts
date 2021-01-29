import UserModel from './user.model'

// function fetch(condition) {
// 	return UserModel.find(condition);
// }

// function update(id, userData) {
// 	return new Promise(function (resolve, reject) {
// 		UserModel.findById(id, function (err, user) {
// 			if (err) {
// 				reject(err);
// 			}
// 			if (!user) {
// 				reject({
// 					msg: 'User Not Found',
// 					status: 404,
// 				});
// 			}
// 			var updatedUser = MappedUser(user, userData);
// 			updatedUser.save(function (err, done) {
// 				if (err) {
// 					reject(err);
// 				}
// 				resolve(done);
// 			});
// 		});
// 	});
// }
// function remove(id) {
// 	return new Promise(function (resolve, reject) {
// 		UserModel.findById(id, function (err, user) {
// 			if (err) {
// 				return reject(err);
// 			}
// 			if (!user) {
// 				return reject({
// 					msg: 'User Not Found',
// 					status: 404,
// 				});
// 			}

// 			user.remove(function (err, done) {
// 				if (err) {
// 					return reject(err);
// 				}
// 				return resolve(done);
// 			});
// 		});
// 	});
// }

export const checkExistingEmailOrUsername = async (username: string, email: string) => {
	return await UserModel.findOne({
		$or: [{ username: username }, { email: email }],
	});
};


