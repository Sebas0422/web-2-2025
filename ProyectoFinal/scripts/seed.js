import { insertPokemons } from './insertPokemons.js';
import { insertTypes } from './insertTypes.js';
import { insertUsers } from './insertUsers.js';

const API_URL = process.env.API_URL || 'http://localhost:3000';
export const seed = async () => {
  try {
    await insertUsers(API_URL);
    await insertTypes(API_URL);
    await insertPokemons(API_URL);
    console.log('✅ Datos insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
    process.exit(1);
  }
};

await seed();
