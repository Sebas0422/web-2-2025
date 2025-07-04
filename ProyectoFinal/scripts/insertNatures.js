export const insertNatures = async (url, token) => {
  const natures = [
    { name: 'Fuerte', increasedStat: 'atk', decreasedStat: 'def' },
    { name: 'Audaz', increasedStat: 'atk', decreasedStat: 'speed' },
    { name: 'Pícara', increasedStat: 'atk', decreasedStat: 'spDef' },
    { name: 'Firme', increasedStat: 'atk', decreasedStat: 'spAtk' },
    { name: 'Floja', increasedStat: 'atk', decreasedStat: 'atk' },

    { name: 'Osada', increasedStat: 'def', decreasedStat: 'atk' },
    { name: 'Agitada', increasedStat: 'def', decreasedStat: 'speed' },
    { name: 'Alocada', increasedStat: 'def', decreasedStat: 'spDef' },
    { name: 'Plácida', increasedStat: 'def', decreasedStat: 'spAtk' },
    { name: 'Dócil', increasedStat: 'def', decreasedStat: 'def' },

    { name: 'Serena', increasedStat: 'spDef', decreasedStat: 'atk' },
    { name: 'Cauta', increasedStat: 'spDef', decreasedStat: 'spAtk' },
    { name: 'Amable', increasedStat: 'spDef', decreasedStat: 'def' },
    { name: 'Miedosa', increasedStat: 'spDef', decreasedStat: 'speed' },
    { name: 'Rara', increasedStat: 'spDef', decreasedStat: 'spDef' },

    { name: 'Miedosa', increasedStat: 'speed', decreasedStat: 'atk' },
    { name: 'Alegre', increasedStat: 'speed', decreasedStat: 'spAtk' },
    { name: 'Ingenua', increasedStat: 'speed', decreasedStat: 'spDef' },
    { name: 'Activa', increasedStat: 'speed', decreasedStat: 'def' },
    { name: 'Seria', increasedStat: 'speed', decreasedStat: 'speed' },

    { name: 'Modesta', increasedStat: 'spAtk', decreasedStat: 'atk' },
    { name: 'Alocada', increasedStat: 'spAtk', decreasedStat: 'def' },
    { name: 'Mansa', increasedStat: 'spAtk', decreasedStat: 'spDef' },
    { name: 'Afable', increasedStat: 'spAtk', decreasedStat: 'speed' },
    { name: 'Tímida', increasedStat: 'spAtk', decreasedStat: 'spAtk' },
  ];

  try {
    for (const nature of natures) {
      await fetch(`${url}/api/natures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nature),
      });
      console.log(`✅ Naturaleza "${nature.name}" insertada`);
    }
  } catch (error) {
    console.error('❌ Error al insertar naturalezas:', error);
  }
};
