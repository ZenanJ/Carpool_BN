//require env
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tutRoutes = require('./routes/tut');
const bodyParser = require('body-parser');
const app = express();

//Environment Variable
const port = process.env.port || 10001;

//use
    // Enable CORS for all routes
app.use(cors());
    //enable middleware
app.use(express.json());
app.use(bodyParser.json());
    // add auth route
app.use('/auth', authRoutes);
    // add tut route
app.use('/tut', tutRoutes);

//start region
    const { connectToDb, getDb } = require('./config/database');
    //db connection
    let db
    connectToDb((err) => {
        if(!err){
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
            db = getDb();
        }
    });

//end region
