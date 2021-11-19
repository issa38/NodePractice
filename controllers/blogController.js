//Controller part of the MVC method

const Blog = require('../models/blog');

//Nomenclature
//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result })
        }).catch((err) => {
            console.log(err);
        });
};

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' })
        }).catch((err) => {
            res.render('404', { title: 'Blog Does Not Exist' })
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
    //This is creates the new blog from the URL encoded object defined above in the middleware section.
    const blog = new Blog(req.body);
    //Then save it to the server
    blog.save()
        .then((result) => {
            //Once this is done since this is Asynchornous, redirect to the home page
            res.redirect('/blogs');
        }).catch((err) => {
            console.log(err)
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            //This sends a response to the browser and then applys the object. The object is redirect which then redirects the user to the main page
            //This is a json response because this is going to be run on the front end and Node code cant run there. But JSON can !
            res.json({ redirect: '/blogs' });
        }).catch((err) => {
            console.log(err);
        });
}

//This is what is refernced when this file is required in another file. Used in the app.js file as the routing for the pages.
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}