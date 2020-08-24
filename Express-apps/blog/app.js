const
    express = require('express'),
    app =  express(),
    port = 3101,
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    config = require('../../../myCredentials'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

const
    Post = require('./models/post'),
    User = require('./models/user'),
    Blog = require('./models/blog');

app.set('view engine', 'ejs');

app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: "The only course you need to learn web development - HTML, CSS, JS, Node, and More!"
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

mongoose.connect(
    `mongodb+srv://@yelpcamp.11vik.mongodb.net/blog?retryWrites=true&w=majority`,
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

app.get('/', (req, res) => {
    res.redirect('blogs');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.post('/register', (req, res) => {

    User.register(new User(req.body.user), req.body.password, (err, user) => {
       if (err){
           console.log(err);
           return res.render('register');
       } else {
           passport.authenticate('local')(req, res,  () => {
              res.redirect('/secret');
           });
       }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), (req, res) => {});

app.get('/secret',isLoggedIn, (req, res) => {
    res.render('secret');
});

// for testing ONLY!
app.get('/newuser', (req, res) => {

    User.create( {
      email: "bob@gmail.com",
      name: "bob belcher"
    });

    Post.create( {
        title: "how to cook p3",
        content: "gibberishala"
    }, (err, post) => {
        if (err) {
            console.log(err)
        } else {
            User.findOne({email: "bob@gmail.com"}, (err, user) => {
                if (err) {
                    console.log(err)
                } else {
                    user.posts.push(post);
                    user.save((err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(data);
                        }
                    });
                }
            });
        }
    });

    User.findOne({email: "bob@gmail.com"}).populate("posts").exec( (err, user) => {
        if (err){
            console.log(err)
        } else {
            console.log(user);
        }
    });

    res.send("new user created");
});


app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
       if(err) {
           console.log("An error occured");
       } else {
           res.render('index', { blogs: blogs});
       }
    });
});

app.get('/blogs/new', (req, res) => {
    res.render("./blog/new");
});

app.post("/blogs", (req, res) => {
    req.body.blog = sanitizeInputs(req);
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err){
            res.render('404notfound');
        } else {
            res.redirect('/blogs');
        }
    });
});

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('./blog/show', { blog: foundBlog});
        }
    });
});

app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('./blog/edit', { blog: foundBlog});
        }
    });
});

app.put('/blogs/:id', (req, res) => {
    req.body.blog = sanitizeInputs(req);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err, updatedBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id,(err) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});

app.listen(port, () =>{
    console.log(`App working at http://localhost:${port}`);
});

function sanitizeInputs(req) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    req.body.blog.title = req.sanitize(req.body.blog.title);
    req.body.blog.image = req.sanitize(req.body.blog.image);
    return req.body.blog;
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
