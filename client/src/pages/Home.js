import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <div className="text-center mt-10">
      <Helmet>
        <title>Home | Proof-Port</title>
        <meta name="description" content="Proof-Port: Verify supplier proofs securely on blockchain." />
      </Helmet>
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Proof-Port</h1>
      <p className="mt-4 text-lg text-gray-700">
        A decentralized solution for supplier verification and authenticity.
      </p>
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Get Started
      </button>
    </div>
  );
}

export default Home;
