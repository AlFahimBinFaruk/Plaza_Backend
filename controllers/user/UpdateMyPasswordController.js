
const bcrypt = require('bcryptjs');
const User = require("../../models/User");

const UpdateMyPasswordController= async (req, res) => {
    try {
        const user_id = req.user.user_id; // Get the ID from the authenticated user
        const { currentPassword, newPassword } = req.body;

        // Validate request
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ msg: 'Both current and new passwords are required' });
        }

        // Find the user
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Current password is incorrect' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports={UpdateMyPasswordController};