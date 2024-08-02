const User = require("../../models/User");

const DeleteUserController= async (req, res) => {
    try {
        const user_id = req.params.user_id;

        // Check if the user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Delete the user
        await User.findByIdAndDelete(user_id);

        return res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports={DeleteUserController};