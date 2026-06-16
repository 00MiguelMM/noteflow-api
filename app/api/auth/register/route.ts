import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';

import { query } from '@/lib/db';
import { createToken } from '@/lib/jwt';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const passwordHash = await hash(password, 10);

    const [user] = await query<{
      id: string;
      email: string;
    }>(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, passwordHash]
    );

    const token = createToken(user.id, user.email);

    return NextResponse.json(
      {
        user,
        token,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'No se pudo registrar el usuario' },
      { status: 500 }
    );
  }
}