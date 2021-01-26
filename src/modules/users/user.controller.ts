const UserService = require('./user.service');

function getUsers(req, res, next) {
  var condition = {};
  UserService.fetch(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function getById(req, res, next) {
  const condition = {
    _id: req.params.id,
  };
  UserService.fetch(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function update(req, res, next) {
  const data = req.body;
  UserService.update(req.params.id, data)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}
function remove(req, res, next) {
  UserService.remove(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

module.exports = {
  getUsers,
  getById,
  update,
  remove,
};
