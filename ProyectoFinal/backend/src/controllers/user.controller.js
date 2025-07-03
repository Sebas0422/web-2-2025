import models from '../models/index.js';
import bcrypt from 'bcryptjs';

const { User, AuthToken } = models;

export const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID de usuario es requerido' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, permissions = [] } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está en uso' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, permissions: permissions });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const mapUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        permissions: user.permissions,
      };
    });
    res.status(200).json(mapUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, permissions = [] } = req.body;

  if (!id || !name || !email || !password) {
    return res.status(400).json({ error: 'ID de usuario, nombre, email, contraseña y permisos son requeridos' });
  }

  try {
    const userExinting = await User.findOne({ where: { id, email } });
    if (!userExinting) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (password === '') {
      return res.status(400).json({ error: 'La contraseña no puede estar vacía' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    userExinting.name = name;
    userExinting.email = email;
    userExinting.password = hashedPassword;
    userExinting.permissions = permissions;

    await userExinting.save();
    res.status(200).json(userExinting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID de usuario es requerido' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Eliminar el token de autenticación asociado al usuario
    const token = await AuthToken.findOne({ where: { userId: user.id } });
    if (token) {
      await token.destroy();
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
