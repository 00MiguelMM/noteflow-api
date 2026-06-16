import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { z } from 'zod';

import { query } from '@/lib/db';
import { createToken } from '@/lib/jwt';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const [user] = await query<{
      id: string;
      email: string;
      password_hash: string;
    }>(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    const isValidPassword = await compare(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    const token = createToken(user.id, user.email);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch {
    return NextResponse.json(
      { error: 'No se pudo iniciar sesión' },
      { status: 500 }
    );
  }
}