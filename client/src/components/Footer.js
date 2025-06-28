import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
      &copy; {new Date().getFullYear()} Proof-Port. All rights reserved.
    </footer>
  );
};

export default Footer;
