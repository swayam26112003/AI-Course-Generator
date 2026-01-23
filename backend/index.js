const express = require('express');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const AiRouter = require('./Routes/AIRouter');
const CourseRouter = require('./Routes/CourseRouter');

require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/ai', AiRouter);
app.use('/course', CourseRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

