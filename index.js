const express = require('express');
const path = require('path');

const port = 8000;
const app = express();

// Setting view engine and view path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parser
app.use(express.urlencoded());

// Including static pages - contained in folder 'static'
app.use(express.static('static'));

// Controller - Home page
app.get('/', (req, res) => {
    res.render('home');
});

// Controller - Create task


// Controller - Delete task


// Bind and listen the connections on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log('Error in running the server: ', err);
        return;
    }
    console.log('Express server is up and running');
});