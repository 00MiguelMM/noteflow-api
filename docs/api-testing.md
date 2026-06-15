# Pruebas de la API

## GET /api/notes

Estado: 200 OK

Respuesta:

```json
[]
```

## POST /api/notes

Estado: 201 Created

Respuesta:

```json
{
  "id": "6b528aa0-7335-4d38-a031-8732673d1be4",
  "title": "Primera nota de prueba",
  "content": "Contenido de prueba",
  "type": "note",
  "color": "#ffffff",
  "created_at": "2026-06-12T13:32:10.466Z",
  "updated_at": "2026-06-12T13:32:10.466Z"
}
```

## GET /api/notes/:id

Estado: 200 OK

Respuesta:

```json
{
  "id": "6b528aa0-7335-4d38-a031-8732673d1be4",
  "title": "Primera nota de prueba",
  "content": "Contenido de prueba",
  "type": "note",
  "color": "#ffffff",
  "created_at": "2026-06-12T13:32:10.466Z",
  "updated_at": "2026-06-12T13:32:10.466Z"
}
```

## PATCH /api/notes/:id

Estado: 200 OK

Respuesta:

```json
{
  "id": "6b528aa0-7335-4d38-a031-8732673d1be4",
  "title": "Nota actualizada",
  "content": "Contenido de prueba",
  "type": "note",
  "color": "#ffffff",
  "created_at": "2026-06-12T13:32:10.466Z",
  "updated_at": "2026-06-12T13:43:17.244Z"
}
```

## DELETE /api/notes/:id

Estado: 204 No Content

Respuesta:

```text
Sin contenido
```

## POST /api/notes/:id/checklist-items

Estado: 201 Created

Respuesta:

```json
{
  "id": "d60ec379-f4e3-460c-ade4-c307720d9c28",
  "note_id": "e3559b73-d8e0-48aa-9d78-5653e710dde3",
  "text": "Comprar leche",
  "is_completed": false
}
```

## GET /api/notes/:id/checklist-items

Estado: 200 OK

Respuesta:

```json
[
  {
    "id": "d60ec379-f4e3-460c-ade4-c307720d9c28",
    "note_id": "e3559b73-d8e0-48aa-9d78-5653e710dde3",
    "text": "Comprar leche",
    "is_completed": false
  }
]
```

## PATCH /api/checklist-items/:itemId

Estado: 200 OK

Respuesta:

```json
{
  "id": "d60ec379-f4e3-460c-ade4-c307720d9c28",
  "note_id": "e3559b73-d8e0-48aa-9d78-5653e710dde3",
  "text": "Comprar leche",
  "is_completed": true
}
```

## DELETE /api/checklist-items/:itemId

Estado: 204 No Content

Respuesta:

```text
Sin contenido
```

## GET /api/notes/:id/checklist-items después de eliminar

Estado: 200 OK

Respuesta:

```json
[]
```