import React from 'react';
import { Helmet } from 'react-helmet-async';

function Dashboard() {
  return (
    <div className="p-4">
      <Helmet>
        <title>Dashboard | ProofPort</title>
        <meta
          name="description"
          content="Manage your supplier proofs and certifications in the ProofPort dashboard."
        />
      </Helmet>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2">
        Here you can manage your supplier proofs, certifications, and approvals.
      </p>
    </div>
  );
}

export default Dashboard;