import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { toast } from "react-toastify";

const SupplierDashboard = () => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newHash, setNewHash] = useState("");

  const fetchSupplierData = async () => {
    try {
      const { contract } = getContract();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const data = await contract.getSupplier(accounts[0]);
      setSupplier({
        name: data[0],
        idNumber: data[1],
        proofHash: data[2],
        certifier: data[3],
        isApproved: data[4],
      });
    } catch (err) {
      toast.error("You are not a registered supplier.");
      setSupplier(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProof = async () => {
    try {
      const { contract } = getContract();
      const tx = await contract.updateProof(newHash);
      await tx.wait();
      toast.success("Proof updated successfully!");
      fetchSupplierData(); // Refresh info
      setNewHash("");
    } catch (err) {
      toast.error("Failed to update proof.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSupplierData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!supplier)
    return (
      <p className="text-center text-red-500">
        You are not a registered supplier. Please register first.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Supplier Dashboard</h2>
      <div className="mb-4">
        <p><strong>Name:</strong> {supplier.name}</p>
        <p><strong>ID Number:</strong> {supplier.idNumber}</p>
        <p><strong>Proof Hash:</strong> {supplier.proofHash}</p>
        <p><strong>Approved:</strong> {supplier.isApproved ? "✅ Yes" : "❌ No"}</p>
        <p><strong>Certifier:</strong> {supplier.certifier}</p>
      </div>
      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Update Proof Hash</h3>
        <input
          type="text"
          placeholder="New proof hash"
          value={newHash}
          onChange={(e) => setNewHash(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          onClick={handleUpdateProof}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Proof
        </button>
      </div>
    </div>
  );
};

export default SupplierDashboard;
