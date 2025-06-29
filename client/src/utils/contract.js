import { ethers } from "ethers";
import ProofPortAbi from "./ProofPortAbi.json"; // we'll create this next

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

// Connect to provider (Metamask injected provider)
export function getContract() {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this app.");
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ProofPortAbi, signer);

  return { contract, provider, signer };
}
