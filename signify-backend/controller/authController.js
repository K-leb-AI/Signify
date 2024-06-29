// controller/authController.js
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { username, password, firstname, surname } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, firstname, surname });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error registering new user');
  }
};

// Login user
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'An error occurred during authentication' });
    }
    
    if (!user) {
      console.log('Authentication failed, info:', info);
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'An error occurred during login' });
      }
      return res.redirect('http://localhost:8000/api/auth/success');
    });
  })(req, res, next);
};


// Success Route
exports.success = (req, res) => {
  if (req.isAuthenticated()) {
    return res.send('Authorized');
  } else {
      return res.redirect('http://localhost:8000/api/auth/failure');
  }
};

// Failure Route
exports.failure = (req, res) => {
  res.send('Login failed');
};

// Logout user
exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send('Logged out');
  });
};

// Get current user
exports.currentUser = (req, res) => {
    console.log(req.user)
    if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      numResults: users.length,
      message: "success",
      users
    });
  } catch (error) {
    res.status(404).json({
      message: "error",
      error
    });
  }
};
