// application

var express = require('express'),
    app = express(), // creates an express application (top level function exported by the express module)
    setupHandlebars  = require('./app/setupHandlebars.js')(app), // logic-less, semantic templates
    setupPassport = require('./app/setupPassport'), // authentication middleware for Node.js
    flash = require('connect-flash'), // special area of the session used for storing messages -- written to the flash and cleared after being displayed to the user.
    // sessions by enabling cookieParser and session middleware
    appRouter = require('./app/routers/appRouter.js')(express), // response to a specific HTTP request that is sent to an endpoint (URI)
    // each route can have one or more handler functions, which are executed when the route is matched
    // ROUTE definition: app.HTTPmethod(PATH, HANDLER)
    session = require('express-session'), // for user sessions
    bodyParser = require('body-parser'), // extracts the entire body portion of an incoming request stream and exposes it on req.body
    // as something easy to interface with.
    cookieParser = require('cookie-parser'), // for cookies
    jsonParser = bodyParser.json(); // middleware that only parses json

var port = process.env.PORT || 5000;

/* Environment depends on the service where you are hosting your application. The host may independenly configure the process.env.PORT variable for you (your script runs in their environment 8080 is simply a static setting*/
// environment variable port, or 8080 if there is nothing there.

/* App use -- binding middleware to an instance of the app object*/
app.use(cookieParser());

/* Session secret used to compute the hash (session ID cookie)
   resave and saveUnitnitialized -- deals with race conditions when the client is making parallel requests without a session*/
    
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }));

/* To serve static files such as images, css files or javascript files, express.static (built-in) middleware starts serving the files direcly
   the path best provided in an absolute form (as the relative path is only in regards to the directory from where the node process is launched*/
app.use('/styles', express.static(__dirname + '/styles'));

app.use(flash());
app.use(function(req, res, next) {
    /* res.locals properties only valid for the lifetime of the request*/
    res.locals.errorMessage = req.flash('error'); // storing session messages
    next(); // call the next middleware function in the stack!
});

app.use(jsonParser); // adds a req.json property which contains the JSON parsed request body
app.use(bodyParser.urlencoded({
  extended: true // extended syntax
}));

setupPassport(app);

app.use('/', appRouter);

// start app

    app.listen(port);
    console.log('Server started on port ' + port);


/* In order to reach the app from other modules, we need to export the express application*/
module.exports.getApp = app;