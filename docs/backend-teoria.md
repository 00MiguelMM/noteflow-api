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

## Bases de datos relacionales

Las bases de datos relacionales almacenan la información en tablas compuestas por filas y columnas. Cada tabla representa una entidad del dominio y las relaciones entre ellas se establecen mediante claves primarias y foráneas.

### Tablas del proyecto

#### notes

- id (UUID, Primary Key)
- title (VARCHAR)
- content (TEXT)
- type (VARCHAR)
- color (VARCHAR)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)

#### checklist_items

- id (UUID, Primary Key)
- note_id (UUID, Foreign Key)
- text (VARCHAR)
- is_completed (BOOLEAN)

#### note_tags

- id (UUID, Primary Key)
- note_id (UUID, Foreign Key)
- tag (VARCHAR)

### Relaciones

notes (1) ---- (N) checklist_items

notes (1) ---- (N) note_tags

Al eliminar una nota, sus checklist items y etiquetas se eliminan automáticamente mediante ON DELETE CASCADE.