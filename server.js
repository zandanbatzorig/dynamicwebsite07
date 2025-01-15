const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./server/config/db');
const Sensor = require('./models/Sensor');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for EJS files (default is 'views')
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files (e.g., CSS, JS, images)
app.use(express.static('public'));

// POST  Seed some sample data (optional, for testing)
app.get('/sensor', async (req, res) => {
    await Sensor.create([
        { temp1: 23.1, temp2: 24.0, humi: 23.0 },
        { temp1: 23.2, temp2: 24.1, humi: 23.1 },
        { temp1: 23.3, temp2: 24.2, humi: 23.2 },
        { temp1: 23.4, temp2: 24.3, humi: 23.3 },
        { temp1: 23.5, temp2: 24.4, humi: 23.4 },
        { temp1: 23.6, temp2: 24.5, humi: 23.5 },
        { temp1: 23.7, temp2: 24.6, humi: 23.6 },
        { temp1: 23.8, temp2: 24.7, humi: 23.7 },
        { temp1: 23.9, temp2: 24.8, humi: 23.8 },
        { temp1: 24.0, temp2: 24.9, humi: 23.9 },
        { temp1: 24.1, temp2: 25.0, humi: 23.0 },
        { temp1: 24.2, temp2: 25.1, humi: 23.1 }
    ]);
    res.send('Sensor Sample data created!');
});

app.get('/showtable2', async (req, res) => {
    // Render the 'about.ejs' file
    //res.render('showtable', { description: 'Here is shown table from database.', title: 'table database' });
    try {
    const locals = {
        title: "table database",
        description: "Here is shown table from database."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const sensor = await Sensor.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Sensor.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const total = await Sensor.countDocuments(); // Total documents in collection
    const totalPages = Math.ceil(total / perPage); // Total pages
        res.render('showtable2', { locals, sensor, current: page, nextPage: hasNextPage ? nextPage : null, totalPages });
        }catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
});

// Routes
app.get('/', async (req, res) => {
    try {
    // Render the 'index.ejs' file and pass variables
    const items = ['Item 1', 'Item 2', 'Item 3'];
    res.render('index', { userName: 'Zandan Batzorig', age: 40, title: 'Welcome Page', termilog: 'fjnbkfgjbk', items });
    }catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/about', (req, res) => {
    // Render the 'about.ejs' file
    res.render('about', { description: 'This is the about page.', title: 'About Us' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});