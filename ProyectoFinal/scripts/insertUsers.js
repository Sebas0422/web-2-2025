import bcrypt from 'bcryptjs';
export const insertUsers = async (url) => {
  // Hashear contraseñas
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('admin123', 10);

  // Crear usuarios
  if (!url) {
    throw new Error('API URL is required');
  }

  console.log('Inserting users...');

  await fetch(`${url}/auth/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NTA5NjI2NjQsImV4cCI6MTc1MDk2NjI2NH0.yCy6ACYoiSC6V_kzH9-hbrV98k8DTz9kMzUpTGr_JzA'
    },
    body: JSON.stringify({
      email: 'user1@example.com',
      password: hashedPassword1,
      permissions: ['user'],
    }),
  });
  await fetch(`${url}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
        'authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NTA5NjI2NjQsImV4cCI6MTc1MDk2NjI2NH0.yCy6ACYoiSC6V_kzH9-hbrV98k8DTz9kMzUpTGr_JzA'
    
    },
    body: JSON.stringify({
      email: 'admin@example.com',
      password: hashedPassword2,
      permissions: ['admin', 'user'],
    }),
  });
};
