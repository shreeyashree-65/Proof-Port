import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Here you can manage suppliers, certifiers, and view proofs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Registered Suppliers</h2>
          <p className="text-gray-500">List of suppliers will appear here.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Certifier Actions</h2>
          <p className="text-gray-500">Manage certifiers and approvals here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
