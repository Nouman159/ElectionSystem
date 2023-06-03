const express = require('express');
const mongoDB = require('./managedb');
const app = express();
const voterRouter = require('./Routes/catalog');
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})
const conn = async () => {
    try {
        const connection = await mongoDB();

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
conn();
// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/', voterRouter);

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
