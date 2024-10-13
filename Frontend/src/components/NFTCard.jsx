function NFTCard({ nft, onBuy }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{nft.details.company_name}</h3>
      <img src={nft.banner_url} alt="NFT Banner" className="w-full h-48 object-cover rounded-lg mt-2" />
      <p className="mt-2">Owner: {nft.owner}</p>
      <button
        onClick={() => onBuy(nft.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
      >
        Buy for {nft.price} Coins
      </button>
    </div>
  );
}

export default NFTCard;
