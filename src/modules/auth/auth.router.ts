import * as controller from './auth.controller'
import { Router } from 'express'
const router = Router()

router.route('/hello').get(controller.hello);

router.route('/register').post(controller.register);
// router.route('/login').post(controller.login);


module.exports = router;
