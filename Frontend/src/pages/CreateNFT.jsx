import { useState } from 'react';
import AdNFTForm from '../components/AdNFTForm';
import { connectWellDoneWallet, signAndSubmitTransactionWellDone } from '../utils/aptosClient';
import { MARKETPLACE_ADDRESS } from '../config'; // Import the marketplace address

function CreateNFT() {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleCreate = async (nftDetails) => {
    if (!walletAddress) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      // Prepare the payload for the transaction
      const payload = {
        type: 'entry_function_payload',
        function: `${MARKETPLACE_ADDRESS}::AdNFTMarketplace::create_ad_nft`,
        type_arguments: [],
        arguments: [
          Array.from(new TextEncoder().encode(nftDetails.uri)),
          Array.from(new TextEncoder().encode(nftDetails.companyName)),
          Array.from(new TextEncoder().encode(nftDetails.videoUrl)),
          Array.from(new TextEncoder().encode(nftDetails.bannerUrl)),
        ],
      };

      // Sign and submit the transaction using WellDone Wallet
      const transactionHash = await signAndSubmitTransactionWellDone(payload);
      alert(`NFT created successfully. Transaction hash: ${transactionHash}`);
    } catch (error) {
      console.error('Failed to create NFT:', error);
      alert('Failed to create NFT');
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
      <h2 className="text-2xl font-bold mb-4">Create a New NFT</h2>
      <button onClick={connectWallet} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Connect Wallet
      </button>
      <AdNFTForm onCreate={handleCreate} />
    </div>
  );
}

export default CreateNFT;
