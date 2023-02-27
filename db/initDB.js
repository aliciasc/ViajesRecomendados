//No es necesario replicar este código en "getDB.js"
require('dotenv').config();

//Importamos la función que permite obtener una conexión con la base de datos.
const getDB = require('./getDB');

//Función asincrona
const createTables = async () => {

    //Variable que almacenará una conexión libre con la base de datos.
    let connection;

    try{
        //Intentamos obtener una conexión libre.
        connection = await getDB();

        console.log('Borrando tablas...');
        await connection.query('DROP TABLE IF EXISTS comment');
        await connection.query('DROP TABLE IF EXISTS vote');
        await connection.query('DROP TABLE IF EXISTS recommendation');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            biography VARCHAR(100),
            photo VARCHAR(100),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS recommendation (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idUser INT UNSIGNED NOT NULL,
            title VARCHAR(100),
            category VARCHAR(100),
            place VARCHAR(100),
            summary VARCHAR(500) ,
            text VARCHAR(100),
            photo VARCHAR(100),
            FOREIGN KEY (idUser) REFERENCES users(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS vote (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idUser INT UNSIGNED NOT NULL,
            idRecommendation INT UNSIGNED NOT NULL,
            value INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES users(id),
            FOREIGN KEY (idRecommendation) REFERENCES recommendation(id)
        )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS comment (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idUser INT UNSIGNED NOT NULL,
            idRecommendation INT UNSIGNED NOT NULL,
            comment VARCHAR(200) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES users(id),
            FOREIGN KEY (idRecommendation) REFERENCES recommendation(id)
        )
        `);

console.log('Tablas creadas');
    } catch (err) {
        console.error(err);

    } finally {

        //Si existe conexión la liberamos.
        if (connection) connection.release();
        
        //Cerramos el proceso.
        process.exit();
    }
};

createTables();