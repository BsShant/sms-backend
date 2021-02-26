const router = require("express").Router();
const { login , register, getMe, logout } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);
router.get('/logout', logout)

module.exports = router;