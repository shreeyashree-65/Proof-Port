import React from 'react';
import { Helmet } from 'react-helmet-async';

function About() {
  return (
    <div className="p-4">
      <Helmet>
        <title>About | ProofPort</title>
        <meta
          name="description"
          content="Learn more about ProofPort and our mission to provide secure, decentralized supplier proof verification."
        />
      </Helmet>
      <h1 className="text-3xl font-bold">About ProofPort</h1>
      <p className="mt-2">
        ProofPort is a decentralized portal designed to authenticate supplier proofs securely and transparently using blockchain technology.
      </p>
    </div>
  );
}

export default About;