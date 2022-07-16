import jwt from 'jsonwebtoken';

type User = {
  id: number;
  email: string;
  isActive: boolean
};

export const generateEmailToken = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

export default function (user: User) {
  return jwt.sign({ id: user.id, email: user.email, isActive: user.isActive }, process.env.JWT_SECRET!);
}
