const mysql = require('mysql2/promise');

//Get the required environment variables.
const {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

//Variable that stores a group of connections.
let pool;


//Function that returns a free connection to the database.
const getDB = async () => {

    try{

        //Create a connection pool if there isn't one.
        if (!pool) {

            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                timezone: 'Z',
            });
        }

        //We return one of the 10 free connections to the database.
        return await pool.getConnection();

    } catch (err) {
        console.error(err);
    }
};

//Export the previous function.
module.exports = getDB;
