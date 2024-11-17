const User = require('../models/user.model');
const Assignment = require('../models/assignmnet.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
    try {
        const assignment = new Assignment({ userId: req.user.id, task, adminId });
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch Admins
exports.fetchAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('name email');
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
