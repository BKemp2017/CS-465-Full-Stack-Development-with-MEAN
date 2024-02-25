const passport = require('passport');
const mongoose = require('mongoose'); 
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ 'message': 'Name, email, and password are required' });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    // Set password using the method defined in your User model
    user.setPassword(req.body.password);

    try {
        await user.save();
        const token = user.generateJwt(); // Ensure this method is properly defined in your User model
        return res.status(200).json({ token });
    } catch(e) {
        return res.status(400).json(e);
    }
};

const login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'message': 'Email and password are required' });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (!user) {
            return res.status(401).json(info);
        }

        // Ensure your setup supports req.logIn (e.g., using passport.initialize() and passport.session() middleware)
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ 'message': 'Error logging in' });
            }
            const token = user.generateJwt(); // Ensure this method is properly defined in your User model
            return res.status(200).json({ token });
        });
    })(req, res, next);
};

module.exports = {
    register,
    login
};
