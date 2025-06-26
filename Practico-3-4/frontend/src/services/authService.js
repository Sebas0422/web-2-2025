const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/api/auth`;

export const login = async (user) => {
  console.log("Intentando iniciar sesión con el usuario:", JSON.stringify(user));
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
}

export const logout = () => {
  try{
    const response = fetch(`${API_URL_AUTH}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    }
  }catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
}