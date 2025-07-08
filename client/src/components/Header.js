import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Proof-Port</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/register" className="hover:underline">Register Supplier</Link>
        <Link to="/supplier" className="hover:underline">Supplier</Link>
      </nav>
    </header>
  );
}

export default Header;
