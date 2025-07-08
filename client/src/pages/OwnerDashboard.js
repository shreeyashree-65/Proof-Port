import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { toast } from "react-toastify";

const OwnerDashboard = () => {
  const [newCertifier, setNewCertifier] = useState("");
  const [certifiers, setCertifiers] = useState([]);
  const [owner, setOwner] = useState("");

  const fetchCertifiers = async () => {
    try {
      const { contract } = await getContract();
      const logs = await contract.queryFilter("CertifierAdded");
      const removedLogs = await contract.queryFilter("CertifierRemoved");

      const added = logs.map((e) => e.args.certifier.toLowerCase());
      const removed = removedLogs.map((e) => e.args.certifier.toLowerCase());

      const active = [...new Set(added)].filter((c) => !removed.includes(c));
      setCertifiers(active);

      const contractOwner = await contract.owner();
      setOwner(contractOwner);
    } catch (err) {
      toast.error("Failed to load certifiers.");
    }
  };

  const handleAdd = async () => {
    try {
      const { contract } = await getContract();
      const tx = await contract.addCertifier(newCertifier);
      await tx.wait();
      toast.success("Certifier added!");
      setNewCertifier("");
      fetchCertifiers();
    } catch (err) {
      toast.error("Failed to add certifier.");
    }
  };

  const handleRemove = async (address) => {
    try {
      const { contract } = await getContract();
      const tx = await contract.removeCertifier(address);
      await tx.wait();
      toast.success("Certifier removed!");
      fetchCertifiers();
    } catch (err) {
      toast.error("Failed to remove certifier.");
    }
  };

  useEffect(() => {
    fetchCertifiers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      <p className="mb-2 text-sm text-gray-600">Contract Owner: <span className="font-mono">{owner}</span></p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCertifier}
          onChange={(e) => setNewCertifier(e.target.value)}
          placeholder="0x... certifier address"
          className="border p-2 flex-grow rounded"
        />
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Certifier
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Active Certifiers</h3>
      <ul className="list-disc list-inside space-y-2">
        {certifiers.length === 0 ? (
          <p>No certifiers added yet.</p>
        ) : (
          certifiers.map((addr) => (
            <li key={addr} className="flex justify-between items-center">
              <span className="font-mono">{addr}</span>
              <button
                onClick={() => handleRemove(addr)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OwnerDashboard;
