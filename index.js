/* EXPRESS SETUP */

const express = require('express');
const app = express();

app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false, 
    saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressSession);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ` + port));

/* PASSPORT SETUP */

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());


/* ROUTES */

const connectEnsureLogin = require('connect-ensure-login');
const { connect } = require('mongoose');

app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect('/login?info=' + info);
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
    })(req, res, next);
});

// Implementing login, user and private get requests.

app.get('/login',
    (req, res) => res.sendFile('html/login.html',
    { root: __dirname})
    );

app.get('/',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('html/index.html', {root: _dirname})
    );

app.get('/private', 
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('html/privatee.html', {root: _dirname})
    );

app.get('/user', 
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.send({user: req.user})
    );

app.post('/logout', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if (err) {
        return next(err);
        }
    
        req.logout();
        return res.redirect('/');
    
    })(req, res, next);
    });





