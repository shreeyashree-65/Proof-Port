import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { toast } from "react-toastify";

const CertifierDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchAllSuppliers = async () => {
  try {
    const { contract } = await getContract();
    const allEvents = await contract.queryFilter("SupplierRegistered");

    const supplierAddresses = allEvents.map((event) => event.args[0]);
    const uniqueAddresses = [...new Set(supplierAddresses)];

    const supplierData = await Promise.all(
      uniqueAddresses.map(async (address) => {
        const s = await contract.getSupplier(address);
        return {
          address,
          name: s[0],
          idNumber: s[1],
          proofHash: s[2],
          certifier: s[3],
          isApproved: s[4],
        };
      })
    );

    setSuppliers(supplierData);
  } catch (err) {
    console.error("Error fetching suppliers", err);
    toast.error("Failed to load suppliers");
  } finally {
    setLoading(false);
  }
};

  const handleApprove = async (supplierAddress) => {
    try {
      const { contract } = await getContract();
      const tx = await contract.approveProof(supplierAddress);
      await tx.wait();
      toast.success("Proof approved!");
      fetchAllSuppliers();
    } catch (err) {
      console.error(err);
      toast.error("Approval failed.");
    }
  };

  const handleRevoke = async (supplierAddress) => {
    try {
      const { contract } = await getContract();
      const tx = await contract.revokeProof(supplierAddress);
      await tx.wait();
      toast.success("Proof revoked.");
      fetchAllSuppliers();
    } catch (err) {
      console.error(err);
      toast.error("Revocation failed.");
    }
  };

  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  if (loading) return <p className="text-center">Loading suppliers...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Certifier Dashboard</h2>

      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Proof Hash</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 border">{s.address}</td>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.idNumber}</td>
                <td className="p-2 border">{s.proofHash}</td>
                <td className="p-2 border">{s.isApproved ? "✅ Approved" : "❌ Not Approved"}</td>
                <td className="p-2 border space-x-2">
                  {!s.isApproved ? (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleApprove(s.address)}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleRevoke(s.address)}
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CertifierDashboard;
