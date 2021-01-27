import * as AuthController from './auth.controller'
import { Router } from 'express'

const router = Router()


// router.route('/register').post(AuthController.register);
// router.route('/login').post(AuthController.login);
router.route('/hello').get(AuthController.hello);

module.exports = router;
