export const getAuthHeaders = (isContentType = true) => {
  const token = localStorage.getItem('token');
  return {
    ...(isContentType ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
