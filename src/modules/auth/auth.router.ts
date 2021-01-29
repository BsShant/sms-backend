import { authenticateToken } from './auth.middleware';
import * as controller from './auth.controller'
import { Router } from 'express'
const router = Router()

router.route('/hello').get(authenticateToken, controller.hello);

router.route('/register').post(controller.register);
router.route('/login').post(controller.login);


module.exports = router;
