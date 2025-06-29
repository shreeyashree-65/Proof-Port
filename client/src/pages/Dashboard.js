import { Helmet } from 'react-helmet-async';

function Dashboard() {
  return (
    <div className="text-center mt-10">
      <Helmet>
        <title>Dashboard | Proof-Port</title>
        <meta name="description" content="Manage and verify supplier proofs on Proof-Port." />
      </Helmet>
      <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
      <p className="mt-4 text-gray-700">This is where you’ll manage suppliers and proofs.</p>
    </div>
  );
}

export default Dashboard;