const User = require("../../models/User");

// only admin can access this
const UpdateUserProfileController = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const updates = req.body;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user fields with new values
        for (let key of Object.keys(updates)) {
            user[key] = updates[key];
        }

        // Save the updated user
        await user.save();

        return res.status(200).json({ msg: 'User updated successfully', user });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports = { UpdateUserProfileController };