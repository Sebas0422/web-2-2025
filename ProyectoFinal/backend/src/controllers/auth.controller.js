import bcrypt from 'bcryptjs';
import models from '../models/index.js';
import { generateAuthToken } from '../utilities/auth.utils.js';

const { User, AuthToken } = models;

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const authToken = generateAuthToken(user);
    let token = await AuthToken.findOne({ where: { userId: user.id } });
    if (token) {
      token.token = authToken;
      await token.save();
    } else {
      token = await AuthToken.create({
        userId: user.id,
        token: authToken,
      });
    }
    res.status(200).json({ message: 'Login exitoso', token: token.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const register = async (req, res) => {
  const { name, email, password, permissions } = req.body;
  if (!name || !email || !password || !permissions) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, permissions });

    const authToken = generateAuthToken(newUser);
    const token = await AuthToken.create({
      userId: newUser.id,
      token: authToken,
      permissions: newUser.permissions,
    });

    res.status(201).json({ message: 'Registro exitoso', token: token.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const logout = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'ID de usuario es requerido' });
  }

  try {
    const token = await AuthToken.findOne({ where: { userId } });
    if (!token) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    await token.destroy();
    res.status(200).json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getUserProfileByToken = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ error: 'Token es requerido' });
  }
  try {
    const authToken = await AuthToken.findOne({ where: { token } });
    if (!authToken) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    const user = await User.findByPk(authToken.userId, {
      attributes: ['email', 'permissions'],
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
