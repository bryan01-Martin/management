const path = require('path');

require('dotenv').config({path : path.join(__dirname, `./config/${process.env.START_TYPE}.env`)})

const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('./database/database.js');
// const oracledb = require('oracledb');

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', async (req, res) => {
    const query = `SELECT ID, IMAGE, NAME, BIRTHDAY, GENDER, JOB FROM CUSTOMER`;
    const bindData = {}
    const result = await oracledb.execute(query, bindData);
    res.send(result.rows);
});

app.listen(port, () => console.log(`Listening on port ${port}`));




