INSTALAR 
-Crear una base de datos vacía en una instancia de MySQL local.

-Guardar el archivo .env.example como .env y cubrir los datos necesarios.

-Ejecutar el comando npm install o npm i para instalar las dependencias.

-Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada.

-Ejecutar npm run dev o npm start para lanzar el servidor.



Base de datos
users: id, name, email, password, biography, photo, createdAt.

recommendation: id, tittle, category, place, summary, text, photo, idUser, createdAt.

vote: id, value, idUser, idRecommendation, createdAt.

comment: id, comment, idUser, idRecommendation, createdAt.



Endpoints usuarios
POST [/users] - Registro de usuario. ✅

POST [/users/login] - Login de usuario (devuelve token). ✅

GET [/users] - Obtener información del usuario del token. TOKEN ✅

PUT [/users] - Editar nombre de usuario, email, contraseña y biografía. TOKEN ❌

PUT [/users/photo] - Editar la foto del usuario. TOKEN ✅



Endpoints recomendaciones
POST [/recommendations] - Crea una recomendación. TOKEN ✅

GET [/recommendation] - Retorna el listado de recomendaciones. ✅

GET [/recommendation/:idRecommendation] - Buscar recomendaciones por lugar o categoría.

GET [/recommendation/:idRecommendation] - Ver detalle de una recomendación.

POST [/recommendation/:idRecommendation/comment] - Añade un comentario en la recomendación. TOKEN

POST [/recommendation/:idRecommendation/votes] - Vota una recomendación (entre 1 y 10). TOKEN

DELETE [/recommendation] - Eliminar una recomendación. TOKEN

