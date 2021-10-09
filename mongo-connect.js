/* MONGOOSE SETUP */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase',
{ userNewURLParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String, 
    password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfor', UserDetail, 'userInfor');

/* PASSPORT LOCAL AUTHENTICATION */

const passport = require('passport');
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

passport.use(new LocalStrategy({
    username: 'email'
 }, register));

UserDetails.register({username:'Scotty', active: false}, 'helloworld');
UserDetails.register({username:'Timmy', active: false}, 'helloworld1');
UserDetails.register({username:'Jason', active: false}, 'helloworld2');
