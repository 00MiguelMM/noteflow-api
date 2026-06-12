import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const updateNoteSchema = z.object({
  title: z.string().min(3).optional(),
  type: z.enum(['note', 'checklist', 'idea']).optional(),
  content: z.string().optional(),
  color: z.string().optional(),
});

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [note] = await query('SELECT * FROM notes WHERE id = $1', [id]);

    if (!note) {
      return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = updateNoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.issues }, { status: 400 });
    }

    const { title, type, content, color } = result.data;

    const [note] = await query(
      `UPDATE notes
       SET
        title = COALESCE($1, title),
        type = COALESCE($2, type),
        content = COALESCE($3, content),
        color = COALESCE($4, color),
        updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [title ?? null, type ?? null, content ?? null, color ?? null, id]
    );

    if (!note) {
      return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deletedNotes = await query('DELETE FROM notes WHERE id = $1 RETURNING id', [id]);

    if (deletedNotes.length === 0) {
      return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}