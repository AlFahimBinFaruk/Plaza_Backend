const User = require("../../models/User");

const GetUserDetailsController = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        if (req.user.role != "admin" && req.user.id != user_id) {
            return res.status(403).json({ msg: 'Access denied' });
        }


        const user = await User.findById(user_id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

module.exports = { GetUserDetailsController };