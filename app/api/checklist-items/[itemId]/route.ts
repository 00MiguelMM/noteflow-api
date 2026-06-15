import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const updateChecklistItemSchema = z.object({
  text: z.string().min(1).optional(),
  is_completed: z.boolean().optional(),
});

type RouteParams = {
  params: Promise<{
    itemId: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { itemId } = await params;
    const body = await request.json();

    const result = updateChecklistItemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.issues }, { status: 400 });
    }

    const { text, is_completed } = result.data;

    const [item] = await query(
      `UPDATE checklist_items
       SET
        text = COALESCE($1, text),
        is_completed = COALESCE($2, is_completed)
       WHERE id = $3
       RETURNING *`,
      [text ?? null, is_completed ?? null, itemId]
    );

    if (!item) {
      return NextResponse.json({ error: 'Checklist item no encontrado' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { itemId } = await params;

    const deletedItems = await query(
      'DELETE FROM checklist_items WHERE id = $1 RETURNING id',
      [itemId]
    );

    if (deletedItems.length === 0) {
      return NextResponse.json({ error: 'Checklist item no encontrado' }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}