const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const port = process.env.SERVER_PORT;

const dbInfo = JSON.parse(fs.readFileSync('./database.json'));


const oracledb = require('oracledb');
// console.log(process.env.ORACLE_INSTANT_HOME);
oracledb.initOracleClient( { libDir : process.env.ORACLE_INSTANT_HOME });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', async (req, res) => {
    const dbconnection = await getConnection();
    const result = await dbconnection.execute(`SELECT ID, IMAGE, NAME, BIRTHDAY, GENDER, JOB FROM CUSTOMER`,);
    res.send(result.rows);

});


app.listen(port, () => console.log(`Listening on port ${port}`));


const getConnection = async () => {
    return await oracledb.getConnection(dbInfo);
}


