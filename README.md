# 🛡️ Proof-Port: Decentralized Supplier Proof Verification System

Proof-Port is a decentralized platform that allows **suppliers** to register their credentials, upload verifiable proofs (e.g., certifications), and get them **approved by trusted certifiers** — all on the **blockchain**. It ensures **transparency**, **trust**, and **immutability** in supply chain verification.

---

##  Features

-  **Supplier Registration** with identity and proof hash (e.g., IPFS/NFT hash)
- 🧾 **Certifier Approval System** — only verified certifiers can approve or revoke proofs
-  **Update Proof** — suppliers can update their uploaded certificate hashes
-  **View Supplier Data** (name, ID, proof, certifier, approval status)
-  **Owner-only Certifier Management**
-  **MetaMask Integration** for secure login and transactions
-  **Deployed on Sepolia Testnet**
-  Built with **React**, **Tailwind CSS**, **Hardhat**, and **Ethers.js**

---

## 📂 Tech Stack

| Layer       | Tools Used                         |
|-------------|------------------------------------|
| Smart Contract | Solidity, Hardhat, OpenZeppelin    |
| Frontend    | React.js, Tailwind CSS, React Router |
| Web3        | Ethers.js, MetaMask                 |
| Network     | Sepolia Testnet via Alchemy        |

---

##  Smart Contract Overview

- **Contract Name**: `ProofPort.sol`
- **Language**: Solidity (v0.8.20)
- **Role-Based Access**:
  - `owner`: can add/remove certifiers
  - `certifier`: can approve or revoke supplier proofs
  - `supplier`: can register and update their proof hash
- Events for each major action ensure transparency on-chain.

---

## 🖥 Running Locally

### 🔧 Prerequisites

- Node.js (v16+)
- MetaMask extension
- Alchemy API Key
- Sepolia testnet ETH

### 🛠️ Setup

```bash
git clone https://github.com/your-username/proof-port.git
cd proof-port
