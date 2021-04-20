
const oracledb = require('oracledb');

/* # set dbConfig */
const dbConfig = {"user":process.env.DB_USER, "password":process.env.DB_PASSWORD, "connectString":process.env.DB_CONNECTSTRING}
oracledb.initOracleClient( { libDir : process.env.ORACLE_INSTANT_HOME });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

class Database {
    // dbConfig = dbConfig
    connection = async () => {
        return await oracledb.getConnection(dbConfig);;
    }
    release = async (connection) => {
        connection.release();
    }
    execute = async (query, bindData) => {
        const toCamelCase = (str) => str.toLowerCase().replace(/\_(.)/gi, (m, c) => c.toUpperCase());
        const conn = await this.connection();
        const data = await conn.execute(query, bindData);
        this.release(conn);
        return data;
    }
}

module.exports = new Database();