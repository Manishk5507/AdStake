import { AptosClient } from "aptos";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com"; // Aptos node URL
const MARKETPLACE_ADDRESS =
  "0xa9792a91d601370385bf1072cf692b4ca0842c80c0c736eccd27ec4d5b41f758"; // Replace with your contract address
const client = new AptosClient(NODE_URL);

let connectedAccount = null; // Variable to store the connected account

// Connect to WellDone Wallet
export const connectWellDoneWallet = async  () => {
  try {
    // Check if WellDone Wallet is installed
    if (!window.dapp) {
      alert("Please install the WellDone Wallet extension.");
      return;
    }

    // If the account is already connected, return the connected account
    if (connectedAccount) {
      console.log("Already connected account:", connectedAccount);
      return connectedAccount;
    }

    // Request account information from WellDone Wallet
    const accounts = await window.dapp.request("aptos", {
      method: "dapp:accounts",
    });

    if (accounts && accounts.length > 0) {
      // Successfully retrieved account information
      connectedAccount = accounts[0]; // Cache the connected account
      console.log("Connected account:", connectedAccount);
      return connectedAccount; // Return the first account
    } else {
      // Clear cached account if no accounts are found
      connectedAccount = null;
      alert("No accounts found. Please create an account in WellDone Wallet.");
      return null;
    }
  } catch (err) {
    console.error("Error connecting to WellDone Wallet:", err);
    // Clear cached account on error
    connectedAccount = null;
    return null;
  }
};

// Sign and submit a transaction with WellDone Wallet
export async function signAndSubmitTransactionWellDone(payload) {
  if (!window.dapp) {
    alert("WellDone Wallet extension is not available.");
    throw new Error("WellDone Wallet extension is not available.");
  }

  try {
    // Sign and submit the transaction using WellDone Wallet
    const response = await window.dapp.request("aptos", {
      method: "dapp:signAndSubmitTransaction",
      params: [payload],
    });

    const transactionHash = response.hash;
    await client.waitForTransaction(transactionHash);
    return transactionHash;
  } catch (error) {
    console.error(
      "Failed to sign and submit transaction with WellDone Wallet:",
      error
    );
    throw error;
  }
}

// Get NFT details
export async function getNFTDetails(tokenId) {
  try {
    const resource = await client.getAccountResource(
      MARKETPLACE_ADDRESS,
      `${MARKETPLACE_ADDRESS}::AdNFTMarketplace::AdNFTStore`
    );

    const nfts = resource.data.nfts;
    if (!nfts[tokenId]) {
      throw new Error("NFT not found");
    }
    return nfts[tokenId];
  } catch (error) {
    console.error("Failed to get NFT details:", error);
    throw error;
  }
}



