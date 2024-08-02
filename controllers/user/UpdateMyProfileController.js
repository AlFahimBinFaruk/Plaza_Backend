const User = require("../../models/User");

const { validationResult } = require("express-validator");
const { isEmail } = require('validator');

const UpdateMyProfileController = async (req, res) => {
    try {
        const userId = req.user.id; // Get the ID from the authenticated user
        const { first_name, last_name, email, phone } = req.body;

        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if email is valid and not already in use
        if (email) {
            if (!isEmail(email)) {
                return res.status(400).json({ msg: 'Invalid email address' });
            }
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser.id !== userId) {
                return res.status(400).json({ msg: 'Email is already in use' });
            }
        }

        // Find and update the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        // Save the updated user
        await user.save();

        return res.status(200).json({ msg: 'Profile updated successfully', user });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports={UpdateMyProfileController};