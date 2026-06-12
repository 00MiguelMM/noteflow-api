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