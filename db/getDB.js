const mysql = require('mysql2/promise');

//Obtenemos las variables de entorno requeridas
const {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

//Variable que almacena un grupo de conexiones (como un array)
let pool;


//Función que retorna una conexión libre con la base de datos.
const getDB = async () => {

    try{

        //Si no hay un grupo de conexiones lo creamos.
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

        //Retornamos una de las 10 conexiones libres conla base de datos.
        return await pool.getConnection();

    } catch (err) {
        console.error(err);
    }
};

//Exportamos la función anterior.
module.exports = getDB;
