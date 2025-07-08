import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { toast } from "react-toastify";

const CertifierDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    try {
      const { contract } = await getContract();
      await window.ethereum.request({ method: "eth_requestAccounts" });
    

      const supplierList = [];

      // Simulate checking 100 recent addresses (this is temporary until we have event indexing or backend)
      for (let i = 0; i < 100; i++) {
        try {
          const randomAddress = `0x${i.toString(16).padStart(40, '0')}`;
          const data = await contract.getSupplier(randomAddress);
          supplierList.push({ address: randomAddress, ...data });
        } catch (err) {
          // skip invalid / non-existent suppliers
        }
      }

      setSuppliers(supplierList);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      toast.error("Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (address) => {
    try {
      const { contract } = await getContract();
      const tx = await contract.approveProof(address);
      await tx.wait();
      toast.success("Proof approved!");
      fetchSuppliers();
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleRevoke = async (address) => {
    try {
      const { contract } = await getContract();
      const tx = await contract.revokeProof(address);
      await tx.wait();
      toast.success("Proof revoked!");
      fetchSuppliers();
    } catch (err) {
      toast.error("Revoking failed");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Certifier Dashboard</h2>
      {loading ? (
        <p>Loading suppliers...</p>
      ) : suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <div className="space-y-4">
          {suppliers.map((supplier, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <p><strong>Address:</strong> {supplier.address}</p>
              <p><strong>Name:</strong> {supplier.name}</p>
              <p><strong>ID Number:</strong> {supplier.idNumber}</p>
              <p><strong>Proof Hash:</strong> {supplier.proofHash}</p>
              <p><strong>Approved:</strong> {supplier.isApproved ? "✅ Yes" : "❌ No"}</p>
              <p><strong>Certifier:</strong> {supplier.certifier}</p>

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleApprove(supplier.address)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRevoke(supplier.address)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertifierDashboard;
