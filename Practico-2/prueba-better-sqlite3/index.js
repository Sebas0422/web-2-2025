// src/index.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Crear instancia de Sequelize usando SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // archivo donde se guardarán los datos
  logging: false, // desactivar logs de SQL
});

// Definir un modelo de ejemplo
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Ruta de ejemplo
app.get('/', async (req, res) => {
  await sequelize.sync(); // asegurarse que las tablas estén
  const user = await User.create({ username: 'NuevoUsuario' });
  res.json(user);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
