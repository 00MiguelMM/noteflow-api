# NoteFlow API

Backend desarrollado con Next.js, TypeScript y PostgreSQL para la aplicación móvil NoteFlow.

## Descripción

Este proyecto implementa una API REST que permite gestionar notas, checklist items y etiquetas almacenadas en una base de datos PostgreSQL alojada en Neon.

La API utiliza una arquitectura cliente-servidor donde la aplicación móvil consume los endpoints mediante peticiones HTTP.

---

# Tecnologías utilizadas

- Next.js
- TypeScript
- PostgreSQL
- Neon Database
- Zod
- Node.js

---

# Instalación y ejecución

## 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

## 2. Acceder al proyecto

```bash
cd noteflow-api
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Crear archivo de variables de entorno

Crear un archivo:

```txt
.env.local
```

Añadir:

```env
DATABASE_URL=postgresql://usuario:password@host/database
```

## 5. Ejecutar el servidor

```bash
npm run dev
```

La API estará disponible en:

```txt
http://localhost:3000
```

---

# Variables de entorno

| Variable | Descripción |
|-----------|------------|
| DATABASE_URL | Cadena de conexión a PostgreSQL |

---

# Endpoints

## Notas

### Obtener todas las notas

```http
GET /api/notes
```

Respuesta:

```json
[
  {
    "id": "uuid",
    "title": "Mi nota",
    "content": "Contenido",
    "type": "note"
  }
]
```

---

### Crear nota

```http
POST /api/notes
```

Body:

```json
{
  "title": "Nueva nota",
  "content": "Contenido",
  "type": "note",
  "color": "#ffffff"
}
```

Respuesta:

```json
{
  "id": "uuid",
  "title": "Nueva nota",
  "content": "Contenido",
  "type": "note"
}
```

---

### Obtener nota por ID

```http
GET /api/notes/:id
```

---

### Actualizar nota

```http
PATCH /api/notes/:id
```

Body:

```json
{
  "title": "Nota actualizada"
}
```

---

### Eliminar nota

```http
DELETE /api/notes/:id
```

Respuesta:

```txt
204 No Content
```

---

# Checklist Items

### Obtener checklist items de una nota

```http
GET /api/notes/:id/checklist-items
```

---

### Crear checklist item

```http
POST /api/notes/:id/checklist-items
```

Body:

```json
{
  "text": "Comprar leche"
}
```

---

### Actualizar checklist item

```http
PATCH /api/checklist-items/:itemId
```

Body:

```json
{
  "is_completed": true
}
```

---

### Eliminar checklist item

```http
DELETE /api/checklist-items/:itemId
```

Respuesta:

```txt
204 No Content
```

---

# Estructura del proyecto

```txt
app/
 └─ api/
     ├─ notes/
     ├─ checklist-items/

lib/
 └─ db.ts

sql/
 └─ schema.sql

docs/
 ├─ backend-teoria.md
 ├─ seguridad-api.md
 ├─ api-testing.md
 └─ queries.sql
```

---

# Base de datos

El proyecto utiliza PostgreSQL con las siguientes tablas:

- notes
- checklist_items
- note_tags

Las relaciones se gestionan mediante claves foráneas y ON DELETE CASCADE.

---

# Despliegue

El backend puede desplegarse en Vercel.

Pasos:

1. Conectar el repositorio de GitHub.
2. Crear el proyecto en Vercel.
3. Añadir la variable DATABASE_URL.
4. Realizar un nuevo despliegue.
5. Verificar el funcionamiento de los endpoints en producción.