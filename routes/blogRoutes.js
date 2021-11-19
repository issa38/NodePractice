const express = require('express')
const blogController = require('../controllers/blogController');

//This is like a mini app. Originally these files were app.() but now they are router.() because I used modular routing
const router = express.Router();

//Blog Routes
router.get('/blogs', blogController.blog_index);

//This deals with sending the posting of the blog to the server.
router.post('/blogs', blogController.blog_create_post);

//This renders the create page where it makes new blogs that are submitted to the database
router.get('/blogs/create', blogController.blog_create_get);

//This then acquires the ID of the blog and GETs
router.get('/blogs/:id', blogController.blog_details);

//The deleting of the blog sending. This takes the params of the ID that is set above this. 
router.delete('/blogs/:id', blogController.blog_delete);

module.exports = router;