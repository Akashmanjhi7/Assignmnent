const express = require('express');
const { registerUser, loginUser, uploadAssignment, fetchAdmins } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', auth, uploadAssignment);
router.get('/admins', auth, fetchAdmins);

module.exports = router;
