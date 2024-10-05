const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt=require('jsonwebtoken')
const sk="saurabh"
exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
console.log(email);

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            fullName,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.send('User registered');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        console.log("email",password);
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User is already registerd' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password is not match' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
             sk,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

