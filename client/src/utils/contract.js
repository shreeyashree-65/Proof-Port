import { ethers } from "ethers";
import ProofPortAbi from "./ProofPortAbi.json";

export async function getContract() {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this app.");
    throw new Error("MetaMask not installed");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ProofPortAbi, signer);

  return { contract, provider, signer };
}
