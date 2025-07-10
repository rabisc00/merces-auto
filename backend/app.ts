const sql = require('./util/database');

const express = require('express');
const database = require('mysql2');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());


sql.sync({ force: true})
    .then((result) => {
        app.listen(3000)
    }).catch((error) => {
        console.log(error);
    });