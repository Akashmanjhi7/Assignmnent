const express = require('express');
const { viewAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminControllar');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/assignments', auth, viewAssignments);
router.post('/assignments/:id/accept', auth, acceptAssignment);
router.post('/assignments/:id/reject', auth, rejectAssignment);

module.exports = router;
