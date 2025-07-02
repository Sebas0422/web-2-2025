import models from '../models/index.js';

const { User, AuthToken } = models;
export const getUserProfile = async ({ token }) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const authToken = await AuthToken.findOne({ where: { token } });
  if (!authToken) {
    throw new Error('Invalid token');
  }

  const user = await User.findByPk(authToken.userId);

  return user;
};
