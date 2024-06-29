const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const express =require('express');
const app = express();
const transLogRouter = require("./routes/translationLogRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const authRouter = require("./routes/authRoutes")
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require("./models/User.js");


dotenv.config({
    path: "./config.env"
})

mongoose.connect("mongodb://localhost:27017/")
.then(()=>console.log("db connected successful"))
.catch(err=>console.log(err))

app.use(cors({
    origin: 'http://localhost:3000', // Allow this origin
    credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
}));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('Password mismatch');
      return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('User authenticated. User: '+ user);
    return done(null, user);
  } catch (err) {
    console.error('Error during authentication:', err);
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
});

// Routes
app.use("/api/logs", transLogRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/auth", authRouter)

const PORT = 8000

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

