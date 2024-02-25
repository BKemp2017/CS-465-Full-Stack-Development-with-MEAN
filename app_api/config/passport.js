const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users'); // Typically, model names are capitalized

passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Using email as the usernameField
  async (email, password, done) => { // It's common to use 'done' instead of 'done_'
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Unrecognized email' }); // More accurate message
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user); // Successful authentication
    } catch (e) {
      return done(e); // Error handling
    }
  }
));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  

module.exports = passport;
