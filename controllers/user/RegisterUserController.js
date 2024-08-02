const User = require("../../models/User");

const { generateToken } = require('../../config/jwt');



const RegisterUserController = async (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;

    try {


        if (!first_name || !email || !password) {
            return res.status(400).json({ msg: "Provide all info." });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            first_name,
            last_name,
            email,
            password,
            phone
        });

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = generateToken(payload);

        return res.status(201).json({ token });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports = { RegisterUserController };