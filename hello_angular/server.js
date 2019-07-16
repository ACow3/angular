var express = require('express'); // Require the Express Module
var app = express(); // Create an Express App
var bodyParser = require('body-parser'); // Require body-parser (to receive post data from clients)
var path = require('path'); // Require path
const flash = require('express-flash');
var mongoose = require('mongoose');
var session = require('express-session');
mongoose.Promise = global.Promise;


// Configuration
app.use(flash());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "hi im alex",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 60000
    }
}))

// Database
mongoose.connect('mongodb://localhost/task');


var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'Mon'
var Task = mongoose.model('Task'); // We are retrieving this Schema from our Models, named 'Quote'


// Routes
app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: tasks
            })
        }
    })
})

app.get('/tasks/:id', function (req, res) {
    Task.findById(req.params.id, function (err, tasks) {
        if (err) {
            console.log("Returned error", err); // Respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({ // Respond with JSON
                message: "Success",
                data: tasks
            })
        }
    })
})

// Edit task route
app.put('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, function (err, tasks) {
        if (err) {
            console.log("Returned error", err); // Respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({ // Respond with JSON
                message: "Success",
                data: tasks
            })
        }
    })
})

// New Task POST route
app.post("/tasks", function (req, res) {
    console.log(req.body)
    Task.create(req.body, function (err, tasks) {
        if (err) {
            console.log('Returned error', err);
            res.json({ // respond with JSON
                message: "Error",
                error: err
            })
        } else {
            res.json({ // respond with JSON
                message: "Success",
                data: tasks
            })
        }
    })
})

// Delete task POST route
app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: tasks
            })
        }
    })
})


app.get('*', function (request, response) {
    response.send("404")
});

app.listen(8000, function () { // Setting our server to listen on Port: 8000
    console.log("listening on port 8000");
});