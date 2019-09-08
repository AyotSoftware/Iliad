const router = require("express").Router();
const passport = require("passport");

const strategies = {
    oauth2: require("passport-oauth2"),
    facebook: require("passport-facebook"),
    twitter: require("passport-twitter"),
    github: require("passport-github"),
    google: require("passport-google-oauth20"),
    amazon: require("passport-amazon")
};

function verifyUser(authType, profile, done) {
    //done: (err) if eg DB error, (null, false, {message: ... }) for incorrect login, (null, user) for correct login
    done(null, false);
}

function initPassport(config) {
    for (let auth in config.auth.strategies) {
        let params = config.auth.strategies[auth];
        params.callbackURL = `${config.auth.callbackHost}/auth/${auth}/verify`;
        passport.use(new strategies[auth](params, (p1, p2, profile, done) => verifyUser(auth, profile, done)));
    }
}

function onLogin(req, res, next) {
    let strategy = req.iliad.config.auth.strategies[req.params.strategy];
    if (!strategy)
        return res.status(404).end("Unsupported authorisation strategy");

    let params = strategy.authParams || {};
    passport.authenticate(req.params.strategy, params)(req, res, next);
}

function onVerify(req, res, next) {
    let strategy = req.iliad.config.auth.strategies[req.params.strategy];
    if (!strategy)
        return res.status(404).end("Unsupported authorisation strategy");

    passport.authenticate(req.params.strategy, { failureRedirect: '/auth/login', successRedirect: '/' })(req, res, next);
}

router.get("/:strategy/login", onLogin);
router.get("/:strategy/verify", onVerify);

module.exports = {
    initPassport,
    router
};