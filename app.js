const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//Express APP invoking 
const app = express();

//Connection to Database
const dbURI = 'mongodb+srv://issa38:Dare1215@nodeprac.vlfpy.mongodb.net/Project1?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

//View Engine Registering. This is my engine that reads my NodeJS code.
//This is why there is no HTML files in the directory. EJS is able to read HTML and NodeJS code so we put them together into one file. ().ejs
app.set('view engine', 'ejs');

//Middleware
//Third party extension that logs stuff to the console. Just some practice
app.use(morgan('dev'));

//Static Files via Middleware. Very important for importing files to the server
app.use(express.static('public'));

//Takes all encoded URL data and passes it to this object! VERY IMPORTANT FOR THE POST DATA FROM THE BLOG
//Just makes it so much simplier when referencing the objects from the post.
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


//This automatically does alot of the setup I did in Server noPackaage. So much simplier.
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//Blog routes. This references the blogRoutes file and assigns all of the parameters and code to the App. This saves like 30 lines of code in this file.
app.use(blogRoutes);

//No Path avail. 404 stuff. This uses function is run every single time in this program is ran. This must be near the bottom
//IF something matches this then every get request is locked after this. This is the last resort sort of say.
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});