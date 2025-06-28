import React from 'react';
import RegisterSupplier from '../components/RegisterSupplier';
import SupplierStatus from '../components/SupplierStatus';
import ApproveProof from '../components/ApproveProof';
import UpdateProof from '../components/UpdateProof';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
      <RegisterSupplier />
      <SupplierStatus />
      <ApproveProof />
      <UpdateProof />
    </div>
  );
};

export default Dashboard;
