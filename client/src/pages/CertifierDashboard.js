import React, { useState } from "react";
import { getContract } from "../utils/contract";
import { toast } from "react-toastify";

const CertifierDashboard = () => {
  const [supplierAddress, setSupplierAddress] = useState("");
  const [supplierData, setSupplierData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchSupplier = async () => {
    try {
      const { contract } = getContract();
      setLoading(true);
      const data = await contract.getSupplier(supplierAddress);
      setSupplierData({
        name: data[0],
        idNumber: data[1],
        proofHash: data[2],
        certifier: data[3],
        isApproved: data[4],
      });
    } catch (err) {
      toast.error("Supplier not found.");
      setSupplierData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      const { contract } = getContract();
      const tx = await contract.approveProof(supplierAddress);
      await tx.wait();
      toast.success("Proof approved.");
      handleFetchSupplier();
    } catch (err) {
      toast.error("Approval failed.");
    }
  };

  const handleRevoke = async () => {
    try {
      const { contract } = getContract();
      const tx = await contract.revokeProof(supplierAddress);
      await tx.wait();
      toast.success("Proof revoked.");
      handleFetchSupplier();
    } catch (err) {
      toast.error("Revocation failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Certifier Dashboard</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Supplier address"
          value={supplierAddress}
          onChange={(e) => setSupplierAddress(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleFetchSupplier}
          className="bg-blue-600 text-white mt-2 px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Supplier
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {supplierData && (
        <div className="border-t pt-4">
          <p><strong>Name:</strong> {supplierData.name}</p>
          <p><strong>ID Number:</strong> {supplierData.idNumber}</p>
          <p><strong>Proof Hash:</strong> {supplierData.proofHash}</p>
          <p><strong>Approved:</strong> {supplierData.isApproved ? "✅ Yes" : "❌ No"}</p>
          <p><strong>Certifier:</strong> {supplierData.certifier}</p>

          <div className="mt-4 flex gap-4">
            <button
              onClick={handleApprove}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={handleRevoke}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Revoke
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertifierDashboard;
