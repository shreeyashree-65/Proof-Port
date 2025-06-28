import React from 'react';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <div className="p-4">
      <Helmet>
        <title>Home | ProofPort</title>
        <meta
          name="description"
          content="Welcome to ProofPort — your trusted decentralized supplier verification portal."
        />
      </Helmet>
      <h1 className="text-3xl font-bold">Welcome to ProofPort</h1>
      <p className="mt-2">Your trusted supplier verification solution.</p>
    </div>
  );
}

export default Home;