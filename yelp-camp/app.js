
const
    express = require('express'),
    app =  express(),
    port = 3100,
    mongoose = require('mongoose'),
    //  for parsing forms
    bodyParser = require("body-parser"),
    //for using PUT and delete
    methodOverride = require('method-override'),
    // for sanitizing input
    expressSanitizer = require('express-sanitizer'),
    //mongoDB user and pass
    config = require('../../myCredentials'),
    // auth middleware
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    seedDB = require("./seed"),
    User = require('./models/user'),
    flash = require('connect-flash');


app.use(flash());
// for stylesheets
app.use(express.static(__dirname +"/public"));
// for parsing forms
app.use(bodyParser.urlencoded({extended: true}));
// make the default view interpreter ejs
app.set('view engine', 'ejs');
// for update and delete
app.use(methodOverride('_method'));
//form sanitizing
app.use(expressSanitizer());

// for hashing passwords
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: "The only course you need to learn web development - HTML, CSS, JS, Node, and More!"
}));
app.use(passport.initialize());
app.use(passport.session());
// middleware
app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));


mongoose.connect(
    `mongodb+srv://@yelpcamp.11vik.mongodb.net/yelp-camp?retryWrites=true&w=majority`,
    {
        user: config.user,
        pass: config.pass,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if(err) {
            console.log(err)
        } else console.log("Connected");
    });


//routes
const
    campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');

app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(port, () => {
   console.log(`Yelp camp: http://localhost:${port}`);
});
