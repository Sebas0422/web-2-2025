import { sequelize } from "../config/db.config.js";
import defineUser  from "./user.js";
import defineAuthToken from "./authToken.js";

const models = {
  User: defineUser(sequelize),
  AuthToken: defineAuthToken(sequelize),
}

models.AuthToken.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'user',
});

export const { User, AuthToken } = models;