import { sequelize } from "../config/db.config.js";
import defineUser  from "./user.js";
import defineAuthToken from "./authToken.js";
import defineAd from "./ad.js";
import definedCrypto from "./crypto.js";

const models = {
  User: defineUser(sequelize),
  AuthToken: defineAuthToken(sequelize),
  Ad: defineAd(sequelize),
  Crypto: definedCrypto(sequelize),
}

models.AuthToken.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'user',
});

models.User.hasMany(models.Ad, { foreignKey: "userId" });
models.Ad.belongsTo(models.User, { foreignKey: "userId" });

models.Crypto.hasMany(models.Ad, { foreignKey: "cryptoId" });
models.Ad.belongsTo(models.Crypto, { foreignKey: "cryptoId" });

export const { User, AuthToken, Crypto, Ad } = models;