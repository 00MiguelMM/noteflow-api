import { sign, verify, type JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'noteflow_jwt_secret_2026';

export type AuthPayload = JwtPayload & {
  userId: string;
  email: string;
};

export function createToken(userId: string, email: string) {
  return sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthPayload {
  return verify(token, JWT_SECRET) as AuthPayload;
}