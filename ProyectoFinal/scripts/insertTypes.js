export const insertTypes = async (url) => {
  const types = [
    { name: 'Normal', color: '#A8A77A' },
    { name: 'Fuego', color: '#EE8130' },
    { name: 'Agua', color: '#6390F0' },
    { name: 'Eléctrico', color: '#F7D02C' },
    { name: 'Planta', color: '#7AC74C' },
    { name: 'Hielo', color: '#96D9D6' },
    { name: 'Lucha', color: '#C22E28' },
    { name: 'Veneno', color: '#A33EA1' },
    { name: 'Tierra', color: '#E2BF65' },
    { name: 'Volador', color: '#A98FF3' },
    { name: 'Psíquico', color: '#F95587' },
    { name: 'Bicho', color: '#A6B91A' },
    { name: 'Roca', color: '#B6A136' },
    { name: 'Fantasma', color: '#735797' },
    { name: 'Dragón', color: '#6F35FC' },
    { name: 'Siniestro', color: '#705746' },
    { name: 'Acero', color: '#B7B7CE' },
    { name: 'Hada', color: '#D685AD' },
  ];
  try {
    // Insertar tipos
    for (const type of types) {
      await fetch(`${url}/api/types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NTA5NjI2NjQsImV4cCI6MTc1MDk2NjI2NH0.yCy6ACYoiSC6V_kzH9-hbrV98k8DTz9kMzUpTGr_JzA'
        },
        body: JSON.stringify(type),
      });
    }

    console.log('✅ Tipos insertados correctamente');
  } catch (error) {
    console.error('❌ Error al insertar tipos:', error);
  }
};
