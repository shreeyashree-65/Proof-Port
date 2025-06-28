import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to Proof-Port
      </h1>
      <p className="text-lg md:text-2xl mb-6 max-w-xl">
        A decentralized portal for verifying supplier proofs with trust and transparency.
      </p>
      <Link
        to="/dashboard"
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
      >
        View Dashboard
      </Link>
    </section>
  );
};

export default Home;
