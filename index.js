const express = require('express');
const path = require('path');

const port = 8000;

const db = require('./config/mongoose');
const TodoList = require('./models/todolist');

const app = express();

// Setting view engine and view path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parser
app.use(express.urlencoded());

// Including static pages - contained in folder 'static'
var publicDir = path.join(__dirname,'/static'); 
app.use(express.static(publicDir)); 

// Controller - Home page
app.get('/', (req, res) => {
    TodoList.find({}, (err, todolist) => {
        if (err) {
            console.log('Error in fetching the contacts');
            return;
        }
        res.render('home', {
            todo_list: todolist
        });
    })
});

// Controller - Create task
app.post('/create-task', (req, res) => {
    // Appending the new task to our task list
    // contactList.push(req.body);
    TodoList.create({ 
        description: req.body.description, 
        category: req.body.category,
        duedate: req.body.duedate
    }, function (err, newTask) {
            if (err) {
                console.log("Error in creating task");
                return;
            }
            console.log("********", newTask);
            res.redirect('/');
        }
    );
});

// Controller - Delete task
app.get('/delete-task', (req, res) => {
    // get the id from query
    let id = req.query.id;

    // find the contact in database entry
    TodoList.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log("Error in deleting contact from database");
            return;
        }
        return res.redirect('/');
    });
    
});

// Bind and listen the connections on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log('Error in running the server: ', err);
        return;
    }
    console.log('Express server is up and running');
});