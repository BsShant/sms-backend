const router = require('express').Router();
const UserController = require('./user.controller');
router.route('/').get(UserController.getUsers);

router
  .route('/:id')
  .get(UserController.getById)
  .put(UserController.update)
  .delete(UserController.remove);

module.exports = router;
