// set the include path to the root of the project
process.env.NODE_PATH = (process.env.NODE_PATH? process.env.NODE_PATH + ":" : "") +  __dirname + "/..";
require('module').Module._initPaths();

const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const error = require("./error");
const session = require("express-session");
const passport = require("passport");
const auth = require("./auth.js");

const config = require("../config");

class Iliad {
    constructor() {
        this.app = express();
        this.config = config;
    }

    init() {
        this.initMiddleware();
        this.createStatic();
        this.initRoutes();
        this.initErrorHandler();

        this.app.listen(this.config.server.port, err => {
            if (err)
                console.log(err);
            else
                console.log("listening on " + this.config.server.port);
        });
    }

    createStatic() {
        this.app.use("/public", express.static(path.join(__dirname, "..", 'public')));
    }

    initMiddleware() {
        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(error.addJSONError);
        this.app.use(session({secret: "dgos"}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use((req, res, next) => {req.iliad = this; next()});

        auth.initPassport(this.config);
    }

    initRoutes() {
        //this.app.use("/", index);
        this.app.use("/auth", auth.router);
    }

    initErrorHandler() {
        // catch 404 and forward to error handler
        this.app.use(throw404);
        this.app.use(onError);

        function throw404(req, res, next) {
            let err = new Error('Not Found');
            err.status = 404;
            next(err);
        }

        function onError(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = err;

            // render the error page
            res.status(err.status || 500);
            res.jsonError(err, "Error", res.locals, res.status);
        }
    }
}


let iliad = new Iliad;
iliad.init();