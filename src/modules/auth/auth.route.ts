const router = require('express').Router();
import AuthController './auth.controller'

router.route('/register').post(AuthController.register);
router.route('/login').post(AuthController.login);

module.exports = router;
