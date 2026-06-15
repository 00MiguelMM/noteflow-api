-- Obtener notas con sus checklist items y tags

SELECT
    n.*,

    -- Agrupa todos los checklist items de la nota en un array JSON
    json_agg(ci.*)
    FILTER (WHERE ci.id IS NOT NULL) AS items,

    -- Agrupa todos los tags de la nota en un array JSON
    json_agg(nt.tag)
    FILTER (WHERE nt.id IS NOT NULL) AS tags

FROM notes n

-- Devuelve todas las notas aunque no tengan checklist items
LEFT JOIN checklist_items ci
    ON n.id = ci.note_id

-- Devuelve todas las notas aunque no tengan tags
LEFT JOIN note_tags nt
    ON n.id = nt.note_id

GROUP BY n.id

ORDER BY n.created_at DESC;