import jwt from 'jsonwebtoken';

export const generateAuthToken = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });;
  return token;
}