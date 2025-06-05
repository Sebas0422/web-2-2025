export const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <p className="mb-4">This page is only accessible to users with admin permissions.</p>
      <p className="text-gray-600">You can manage users, view reports, and perform administrative tasks here.</p>
    </div>
  );
}