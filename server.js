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

const multer = require('multer');
const OracleDB = require('oracledb');
const upload = multer({dest: './upload'});
app.use('/image', express.static('./upload'));

app.get('/api/customers', async (req, res) => {
    const query = `SELECT ID, IMAGE, NAME, BIRTHDAY, GENDER, JOB FROM CUSTOMER`;
    const bindData = {}
    const result = await oracledb.execute(query, bindData);
    console.log(result);
    res.send(result.rows);
});

app.post('/api/customers', upload.single('image'), async (req,res) => {
    
    let query = 'INSERT INTO CUSTOMER (ID, IMAGE, NAME, BIRTHDAY, GENDER, JOB) VALUES ( NULL, :image, :name, :birthday, :gender, :job)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let bindData = {
        'image': image,
        'name': name, 
        'birthday': birthday, 
        'gender': gender, 
        'job':job
    };
    const result = await oracledb.execute(query, bindData);
    res.send(result.rows)
});


app.listen(port, () => console.log(`Listening on port ${port}`));




