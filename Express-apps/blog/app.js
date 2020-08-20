const
    express = require('express'),
    app =  express(),
    port = 3101,
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    config = require('../../../myCredentials');

const
    Post = require('./models/post'),
    User = require('./models/user'),
    Blog = require('./models/blog');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
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
    res.render("new");
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
            res.render('show', { blog: foundBlog});
        }
    });
});

app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', { blog: foundBlog});
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
