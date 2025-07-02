const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (user) => {
  try {
    const response = await fetch(`${API_URL_AUTH}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL_AUTH}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

export const register = async (user) => {
  try {
    const response = await fetch(`${API_URL_AUTH}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};
