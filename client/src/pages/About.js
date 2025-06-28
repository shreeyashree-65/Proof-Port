import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">About Proof-Port</h1>
      <p className="text-gray-600 mb-4">
        Proof-Port is a decentralized portal for supplier authenticity verification. 
        It enables suppliers to register their proofs (e.g. certificates, licenses) 
        and allows approved certifiers to validate these proofs.
      </p>
      <p className="text-gray-600 mb-4">
        By using blockchain technology, Proof-Port ensures transparency, immutability, 
        and trust in the verification process, preventing fraud and enhancing supply chain integrity.
      </p>
      <p className="text-gray-600">
        This portal is designed for businesses, certifiers, and stakeholders who require reliable 
        supplier data in a decentralized, tamper-proof format.
      </p>
    </div>
  );
};

export default About;
