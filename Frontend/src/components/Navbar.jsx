import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AdNFT Marketplace</Link>
        <div className="space-x-4">
          <Link to="/create" className="hover:text-gray-300">Create NFT</Link>
          <Link to="/marketplace" className="hover:text-gray-300">Marketplace</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
