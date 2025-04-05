require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors") ;
const port = 5000;
const db = require("./database/db") ;
const studentRouter = require('./routes/students');
app.use(cors())
app.use(express.json());

app.use("/", studentRouter) ;

app.listen(port, () => {
    db ;
   console.log(`Server running on port ${port}`);
});