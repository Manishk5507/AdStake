import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">AdStake</Link>
        <div>
          <Link to="/create" className="text-white px-3">Create Ad</Link>
          <Link to="/marketplace" className="text-white px-3">Marketplace</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
