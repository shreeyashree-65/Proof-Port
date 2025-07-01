import React, { useState } from "react";
import { getContract } from "../utils/contract";

function RegisterSupplier() {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("Processing...");

    try {
      const { contract } = await getContract();
      const tx = await contract.registerSupplier(name, data); // adjust if your method differs
      await tx.wait();
      setStatus("✅ Supplier registered successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to register supplier.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register Supplier</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1">Supplier Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Supplier Data</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}

export default RegisterSupplier;
