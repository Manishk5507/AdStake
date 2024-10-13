import { useState } from 'react';

function AdNFTForm({ onCreate }) {
  const [uri, setUri] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ uri, companyName, videoUrl, bannerUrl });
    setUri('');
    setCompanyName('');
    setVideoUrl('');
    setBannerUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="NFT URI"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        className="block w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="block w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="block w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Banner URL"
        value={bannerUrl}
        onChange={(e) => setBannerUrl(e.target.value)}
        className="block w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create NFT
      </button>
    </form>
  );
}

export default AdNFTForm;
