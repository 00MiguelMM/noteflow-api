import { verifyToken, type AuthPayload } from './jwt';

export function getUserFromRequest(request: Request): AuthPayload | null {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}