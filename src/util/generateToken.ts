import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constant';

export default function generateToken(id: string) {
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    {
      expiresIn: '3 days',
    }
  );
}
