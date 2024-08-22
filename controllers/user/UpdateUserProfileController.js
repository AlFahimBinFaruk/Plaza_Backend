const User = require("../../models/User");

// Only admin can access this
const UpdateUserProfileController = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { first_name, last_name, email, phone, role } = req.body;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if email is unique
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ msg: 'Email already in use' });
            }
        }

        // Update user fields with new values
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role) user.role = role;

        // Save the updated user
        await user.save();

        return res.status(200).json({ msg: 'User updated successfully', user });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { UpdateUserProfileController };
