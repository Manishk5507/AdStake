module AdNFTMarketplace {

    // Define the structure for Advertisement details
    struct AdDetails has copy, drop, store {
        company_name: vector<u8>,
        video_url: vector<u8>,
        banner_url: vector<u8>,
    }

    // Define the structure for each NFT with its details
    struct AdNFT has key, store {
        id: u64,                     // Unique token ID
        uri: vector<u8>,             // URI for the media
        owner: address,              // Owner of the NFT
        details: AdDetails,          // AdDetails struct
    }

    // Global resource storing all NFTs
    struct AdNFTStore has key {
        nfts: table<u64, AdNFT>,      // Mapping of tokenId to AdNFT struct
        total_nfts: u64,              // Total number of NFTs
        listing_prices: table<u64, u64>, // Mapping tokenId to listing price
    }

    // Define the marketplace fee recipient and fee percentage (fixed for simplicity)
    struct MarketplaceSettings has store {
        fee_recipient: address,
        fee_percentage: u64,  // fee in percentage (e.g., 5 means 5%)
    }

    // Initialize the contract with fee settings
    public fun initialize(fee_recipient: address, fee_percentage: u64) {
        let nfts = table::new<u64, AdNFT>();
        let listing_prices = table::new<u64, u64>();
        let total_nfts = 0;

        move_to(&signer, AdNFTStore { nfts, total_nfts, listing_prices });
        move_to(&signer, MarketplaceSettings { fee_recipient, fee_percentage });
    }

    // Function to create a new NFT
    public fun create_ad_nft(
        account: &signer, 
        uri: vector<u8>, 
        company_name: vector<u8>, 
        video_url: vector<u8>, 
        banner_url: vector<u8>
    ) {
        let store = borrow_global_mut<AdNFTStore>(signer::address_of(account));
        let token_id = store.total_nfts;
        let details = AdDetails { company_name, video_url, banner_url };
        let nft = AdNFT { id: token_id, uri, owner: signer::address_of(account), details };

        table::add(&mut store.nfts, token_id, nft);
        store.total_nfts = store.total_nfts + 1;
    }

    // Function to list an NFT for sale
    public fun list_ad_nft(account: &signer, token_id: u64, price: u64) {
        let store = borrow_global_mut<AdNFTStore>(signer::address_of(account));
        let nft = table::borrow_mut(&mut store.nfts, token_id);

        assert!(nft.owner == signer::address_of(account), 1); // Only the owner can list

        table::add(&mut store.listing_prices, token_id, price);
    }

    // Function to buy a listed NFT with payment logic
    public fun buy_ad_nft(buyer: &signer, token_id: u64, payment_amount: u64) {
        let store = borrow_global_mut<AdNFTStore>(signer::address_of(buyer));
        let nft = table::borrow_mut(&mut store.nfts, token_id);
        let sale_price = table::borrow(&mut store.listing_prices, token_id);

        assert!(sale_price <= payment_amount, 2); // Ensure the correct price is provided

        let seller = nft.owner;
        let settings = borrow_global<MarketplaceSettings>(signer::address_of());

        // Calculate marketplace fee (e.g., 5% fee)
        let fee_amount = (payment_amount * settings.fee_percentage) / 100;
        let seller_proceeds = payment_amount - fee_amount;

        // Transfer ownership of the NFT to the buyer
        nft.owner = signer::address_of(buyer);

        // Transfer payments (simulate with token module or custom logic)
        // The following code assumes a token-based system for transfers
        Token::transfer(buyer, seller, seller_proceeds);           // Transfer proceeds to seller
        Token::transfer(buyer, settings.fee_recipient, fee_amount); // Transfer fee to marketplace

        // Remove the NFT from the listings
        table::remove(&mut store.listing_prices, token_id);
    }

    // Function to get details of an NFT
    public fun get_nft_details(token_id: u64): (address, vector<u8>, AdDetails) {
        let store = borrow_global<AdNFTStore>(signer::address_of());
        let nft = table::borrow(&store.nfts, token_id);
        return (nft.owner, nft.uri, nft.details);
    }

    // Function to burn an NFT
    public fun burn_ad_nft(account: &signer, token_id: u64) {
        let store = borrow_global_mut<AdNFTStore>(signer::address_of(account));
        table::remove(&mut store.nfts, token_id);
    }
}
