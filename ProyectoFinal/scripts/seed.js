import { insertPokemons } from './insertPokemons.js';
import { insertTypes } from './insertTypes.js';
import { insertUsers } from './insertUsers.js';

const API_URL = process.env.API_URL || 'http://localhost:3000';
export const seed = async () => {
  try {
    const token = await insertUsers(API_URL);
    console.log('Response token:', token);
    await insertTypes(API_URL, token);
    await insertPokemons(API_URL, token);
    console.log('✅ Datos insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
    process.exit(1);
  }
};

await seed();
