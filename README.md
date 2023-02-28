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

Recomendaciones de viajes.


Se trata de una web donde los usuarios publican entradas sobre viajes.


Cada entrada tiene título, descripción, lugar y hasta 3 fotos asignadas.


Cada entrada puede ser votada con una puntuación entre 1 y 5.



Instalar


Crear una base de datos vacía en una instancia de MySQL local.


Guardar el archivo .env.example como .env y cubrir los datos necesarios.


Ejecutar el comando npm install o npm i para instalar las dependencias.


Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada.


Ejecutar npm run dev o npm start para lanzar el servidor.



Base de datos


users: id, email*, password*, username*, avatar, role ("admin", "normal"), active, registrationCode, createdAt, modifiedAt.


travels: id, title*, place*, description*, idUser, createdAt.


travelPhotos: id, name, idTravel, createdAt.


travelVotes: id, value*, idTravel, idUser, createdAt.



Endpoints del usuario


POST - [/users] - Crea un usuario pendiente de validar y se envía un correo de verificación. ✅


PUT - [/users/validate/:registerCode] - Valida a un usuario recién registrado. ✅


POST - [/users/login] - Logea a un usuario retornando un token. ✅


GET - [/users] - Retorna información de un usuario. ➡️ Token ✅


PUT - [/users/avatar] - Permite actualizar el avatar del usuario. ➡️ Token ✅



Endpoints del diario


POST - [/travels] - Crea una entrada. ➡️ Token ✅


GET - [/travels] - Retorna el listado de entradas. ✅


GET - [/travels/:idTravel] - Retorna una entrada en concreto. ✅


POST - [/travels/:idTravel/votes] - Vota una entrada (entre 1 y 5). ➡️ Token ✅


POST - [/travels/:idTravel/photos] - Agregar una foto a una entrada. ➡️ Token ✅


DELETE - [/travels/:idTravel/photos/:idPhoto] - Eliminar una foto de una entrada. ➡️ Token ✅

GET [/recommendation/:idRecommendation] - Buscar recomendaciones por lugar o categoría. **Estoy en ello**

GET [/recommendation/:idRecommendation] - Ver detalle de una recomendación. ✅

POST [/recommendation/:idRecommendation/comment] - Añade un comentario en la recomendación. TOKEN  ✅

POST [/recommendation/:idRecommendation/votes] - Vota una recomendación (entre 1 y 10). TOKEN  ✅

DELETE [/recommendation] - Eliminar una recomendación. TOKEN
