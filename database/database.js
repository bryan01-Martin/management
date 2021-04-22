
const oracledb = require('oracledb');

/* # set dbConfig */
const dbConfig = {"user":process.env.DB_USER, "password":process.env.DB_PASSWORD, "connectString":process.env.DB_CONNECTSTRING}
oracledb.initOracleClient( { libDir : process.env.ORACLE_INSTANT_HOME });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

class Database {
    
    connection = async () => {
        return await oracledb.getConnection(dbConfig);;
    }
    release = async (connection) => {
        console.log('reaease connection');
        connection.release();
    }
    execute = async (query, bindData) => {
        const toCamelCase = (str) => str.toLowerCase().replace(/\_(.)/gi, (m, c) => c.toUpperCase());
        const conn = await this.connection();
        let data = {}
        await conn.execute(query, bindData).then((result) => {
            if(result.rows != undefined) {
                result.rows.forEach((row, index) => {
                    result.rows[index] = Object.fromEntries( Object.entries(row).map( ([key, value]) => [toCamelCase(key), value]) );
                });
            }
            data = result;
        }).catch(err => {
            console.log(err);
        });
        this.release(conn);
        return data;
    }
}

module.exports = new Database();