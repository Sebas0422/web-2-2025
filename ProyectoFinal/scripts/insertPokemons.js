export const insertPokemons = async (url, token) => {
  try {
    const pokemons = [
      {
        name: 'Bulbasaur',
        imagePatch: 'bulbasaur.png',
        typeId: 5, // Planta
        baseHp: 45,
        baseAttack: 49,
        baseDefense: 49,
        baseSpAttack: 65,
        baseSpDefense: 65,
        baseSpeed: 45,
      },
      {
        name: 'Charmander',
        imagePatch: 'charmander.png',
        typeId: 2, // Fuego
        baseHp: 39,
        baseAttack: 52,
        baseDefense: 43,
        baseSpAttack: 60,
        baseSpDefense: 50,
        baseSpeed: 65,
      },
      {
        name: 'Squirtle',
        imagePatch: 'squirtle.png',
        typeId: 3, // Agua
        baseHp: 44,
        baseAttack: 48,
        baseDefense: 65,
        baseSpAttack: 50,
        baseSpDefense: 64,
        baseSpeed: 43,
      },
      {
        name: 'Pikachu',
        imagePatch: 'pikachu.png',
        typeId: 4,
        baseHp: 35,
        baseAttack: 55,
        baseDefense: 40,
        baseSpAttack: 50,
        baseSpDefense: 50,
        baseSpeed: 90,
      },
      {
        name: 'Jigglypuff',
        imagePatch: 'jigglypuff.png',
        typeId: 1, // Normal
        baseHp: 115,
        baseAttack: 45,
        baseDefense: 20,
        baseSpAttack: 45,
        baseSpDefense: 25,
        baseSpeed: 20,
      },
      {
        name: 'Machop',
        imagePatch: 'machop.png',
        typeId: 7, // Lucha
        baseHp: 70,
        baseAttack: 80,
        baseDefense: 50,
        baseSpAttack: 35,
        baseSpDefense: 35,
        baseSpeed: 35,
      },
      {
        name: 'Gastly',
        imagePatch: 'gastly.png',
        typeId: 14, // Fantasma
        baseHp: 30,
        baseAttack: 35,
        baseDefense: 30,
        baseSpAttack: 100,
        baseSpDefense: 35,
        baseSpeed: 80,
      },
      {
        name: 'Geodude',
        imagePatch: 'geodude.png',
        typeId: 13, // Roca
        baseHp: 40,
        baseAttack: 80,
        baseDefense: 100,
        baseSpAttack: 30,
        baseSpDefense: 30,
        baseSpeed: 20,
      },
      {
        name: 'Dratini',
        imagePatch: 'dratini.png',
        typeId: 15, // Dragón
        baseHp: 41,
        baseAttack: 64,
        baseDefense: 45,
        baseSpAttack: 50,
        baseSpDefense: 50,
        baseSpeed: 50,
      },
      {
        name: 'Eevee',
        imagePatch: 'eevee.png',
        typeId: 1, // Normal
        baseHp: 55,
        baseAttack: 55,
        baseDefense: 50,
        baseSpAttack: 45,
        baseSpDefense: 65,
        baseSpeed: 55,
      },
    ];
    // Insertar pokemons
    for (const pokemon of pokemons) {
      console.log(`Insertando pokemon: ${pokemon.name}`);
      const newPokemon = await fetch(`${url}/api/pokemons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(pokemon),
      });
      console.log('Pokemon insertado:', await newPokemon.json());
      console.log(`✅ Pokemon ${pokemon.name} insertado correctamente`);
    }
    console.log('✅ Pokemons insertados correctamente');
  } catch (error) {
    console.error('❌ Error al insertar pokemons:', error);
  } finally {
    process.exit(0);
  }
};
