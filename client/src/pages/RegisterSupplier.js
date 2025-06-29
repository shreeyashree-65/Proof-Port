import { useState } from "react";
import { getContract } from "../utils/contract";

function RegisterSupplier() {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [proofHash, setProofHash] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const { contract } = getContract();
      const tx = await contract.registerSupplier(name, idNumber, proofHash);
      await tx.wait();
      alert("Supplier registered successfully!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Error registering supplier. Check console.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Register as Supplier</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Proof Hash (e.g. IPFS CID)"
          value={proofHash}
          onChange={(e) => setProofHash(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterSupplier;
