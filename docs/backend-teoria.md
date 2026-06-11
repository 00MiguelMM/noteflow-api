# Backend propio y base de datos relacional

## Patrón cliente-servidor

En una arquitectura cliente-servidor cada componente tiene una responsabilidad específica.

La aplicación móvil actúa como cliente y envía peticiones al servidor mediante HTTP. El backend recibe esas peticiones, valida los datos y se comunica con la base de datos. Finalmente devuelve una respuesta al cliente.

Esta arquitectura evita que la aplicación móvil tenga acceso directo a la base de datos, mejorando la seguridad y permitiendo centralizar la lógica de negocio.

## API REST

Una API REST es una interfaz que permite la comunicación entre cliente y servidor utilizando peticiones HTTP.

Los recursos se identifican mediante rutas o endpoints. Por ejemplo:

- GET /api/notes
- POST /api/notes
- PATCH /api/notes/:id
- DELETE /api/notes/:id

La API REST será la encargada de gestionar todas las operaciones relacionadas con los datos almacenados en PostgreSQL.

## Métodos HTTP

Los métodos HTTP indican la acción que se desea realizar sobre un recurso.

- GET: obtener información.
- POST: crear un nuevo recurso.
- PATCH: modificar parcialmente un recurso existente.
- DELETE: eliminar un recurso.

Estos métodos forman la base de las operaciones CRUD (Create, Read, Update y Delete).

## Códigos de estado

Los códigos de estado indican el resultado de una petición HTTP.

- 200 OK: operación realizada correctamente.
- 201 Created: recurso creado correctamente.
- 400 Bad Request: datos inválidos enviados por el cliente.
- 401 Unauthorized: usuario no autorizado.
- 404 Not Found: recurso no encontrado.
- 500 Internal Server Error: error interno del servidor.

Por motivos de seguridad no deben devolverse al cliente los errores internos reales de la base de datos.