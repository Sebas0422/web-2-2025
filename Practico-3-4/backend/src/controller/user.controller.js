import { User } from "../models/index.js";
import bcrypt from 'bcryptjs';

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
}

export const createUser = async (req, res) => {
  const { name, email, password, permissions = []} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
  }
  
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está en uso' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password, permissions:hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const mapUsers = users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        permissions: user.permissions
      };
    });
    res.status(200).json(mapUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, permissions = [] } = req.body;
  
  if (!id || !name || !email || !password) {
    return res.status(400).json({ error: 'ID de usuario, nombre, email, contraseña y permisos son requeridos' });
  }
  
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.permissions = permissions;
    
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}