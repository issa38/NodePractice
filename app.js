//Timer Study Program
const express = require('express');
const app = express();
const { Timer } = require('timer-node');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
})

const timer = new Timer({ label: 'test-timer' });
timer.start();


//404 page for if nothing can be returned
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
//Port for the local host
app.listen(3000);