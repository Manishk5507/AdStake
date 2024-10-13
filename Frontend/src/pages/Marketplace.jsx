import { useState, useEffect } from 'react';
import NFTCard from '../components/NFTCard';
import { connectWellDoneWallet, signAndSubmitTransactionWellDone, getNFTDetails } from '../utils/aptosClient';
import { MARKETPLACE_ADDRESS } from '../config'; // Import the marketplace address

function Marketplace() {
  const [nfts, setNfts] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    // Load NFT data
    const fetchNFTs = async () => {
      try {
        const tokenId = 0; // Replace with actual token ID
        const nftDetails = await getNFTDetails(tokenId);
        setNfts([nftDetails]); // Replace with a real list of NFTs
      } catch (error) {
        console.error('Failed to fetch NFTs:', error);
      }
    };
    fetchNFTs();
  }, []);

  const handleBuy = async (tokenId) => {
    if (!walletAddress) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      // Prepare the payload for the transaction
      const payload = {
        type: 'entry_function_payload',
        function: `${MARKETPLACE_ADDRESS}::AdNFTMarketplace::buy_ad_nft`,
        type_arguments: [],
        arguments: [tokenId.toString(), '100'], // Replace with the actual payment amount
      };

      // Sign and submit the transaction using WellDone Wallet
      const transactionHash = await signAndSubmitTransactionWellDone(payload);
      alert(`NFT purchased successfully. Transaction hash: ${transactionHash}`);
    } catch (error) {
      console.error('Failed to buy NFT:', error);
      alert('Failed to buy NFT');
    }
  };

  const connectWallet = async () => {
    try {
      const address = await connectWellDoneWallet();
      setWalletAddress(address);
      alert(`Wallet connected: ${address}`);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      <button onClick={connectWallet} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Connect Wallet
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nfts.map((nft, index) => (
          <NFTCard key={index} nft={nft} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
