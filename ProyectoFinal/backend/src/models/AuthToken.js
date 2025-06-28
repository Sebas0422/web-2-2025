import { DataTypes } from 'sequelize';

const AuthToken = (sequelize) =>
  sequelize.define(
    'AuthToken',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      permissions: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('permissions');
          try {
            return raw ? JSON.parse(raw) : null;
          } catch {
            return null;
          }
        },
        set(value) {
          this.setDataValue('permissions', JSON.stringify(value));
        },
      },
    },
    {
      tableName: 'auth_tokens',
      timestamps: true,
    },
  );

export default AuthToken;
