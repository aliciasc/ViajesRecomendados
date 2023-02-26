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
POST [/recommendations] - Crea una recomendación. TOKEN 

GET [/recommendation] - Retorna el listado de recomendaciones. ?????PREGUNTAR LEIRE?????

GET [/recommendation/:idRecommendation] - Buscar recomendaciones por lugar o categoría.

GET [/recommendation/:idRecommendation] - Ver detalle de una recomendación.

POST [/recommendation/:idRecommendation/comment] - Añade un comentario en la recomendación. TOKEN

POST [/recommendation/:idRecommendation/votes] - Vota una recomendación (entre 1 y 10). TOKEN

DELETE [/recommendation] - Eliminar una recomendación. TOKEN

