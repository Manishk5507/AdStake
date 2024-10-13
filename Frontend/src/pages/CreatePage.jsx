import { useState } from 'react';

function CreateAd() {
  const [companyName, setCompanyName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call Aptos contract method to create an ad NFT
    console.log("Ad created with", { companyName, videoUrl, bannerUrl, price });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Ad</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="block w-full mb-4 p-2 border" />
        <input type="text" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="block w-full mb-4 p-2 border" />
        <input type="text" placeholder="Banner URL" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} className="block w-full mb-4 p-2 border" />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full mb-4 p-2 border" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Create Ad</button>
      </form>
    </div>
  );
}

export default CreateAd;
