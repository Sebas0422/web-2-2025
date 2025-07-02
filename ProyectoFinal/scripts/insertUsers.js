export const insertUsers = async (url) => {
  if (!url) {
    throw new Error('API URL is required');
  }

  await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      permissions: ['admin', 'user'],
    }),
  });

  const response = await fetch(`${url}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123',
  })
})
const data = await response.json();
console.log('Response from insertUsers:', data);
return data.token;
};
