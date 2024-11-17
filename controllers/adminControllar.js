const Assignment = require('../models/assignmnet.model');

// View Assignments
exports.viewAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.user.id }).populate('userId', 'name');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        assignment.status = 'accepted';
        await assignment.save();
        res.json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        assignment.status = 'rejected';
        await assignment.save();
        res.json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
