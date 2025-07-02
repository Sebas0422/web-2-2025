import { DataTypes } from 'sequelize';

const User = (sequelize) =>
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]',
        get() {
          const raw = this.getDataValue('permissions');
          // Convierte los permiso almacenados en un Array de strings
          return raw ? JSON.parse(raw) : [];
        },
        set(value) {
          this.setDataValue('permissions', JSON.stringify(value));
        },
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    },
  );

export default User;
