const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const oracledb = require('oracledb');
console.log(process.env.ORACLE_INSTANT_HOME);
oracledb.initOracleClient( { libDir : process.env.ORACLE_INSTANT_HOME });
// const dbconnection = await oracledb.getConnection({user : "ADMIN" , passwd : 'Shhklove825!@', connectionString: 'dev01_high' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', async (req, res) => {
    console.log('/api/customers')
    const dbconnection = await getConnection();
    const result = await dbconnection.execute(`SELECT * FROM CUSTOMER`);
    res.send(result.rows);

});


app.listen(port, () => console.log(`Listening on port ${port}`));


const getConnection = async () => {
    return await oracledb.getConnection({user : "dev01" , password : 'reactManagement01', connectionString: 'dev01database_high' });
}


