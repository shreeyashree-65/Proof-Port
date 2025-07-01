import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

const Dashboard = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { contract } = await getContract();
        const supplierCount = await contract.getSupplierCount();

        let supplierList = [];
        for (let i = 0; i < supplierCount; i++) {
          const supplier = await contract.suppliers(i);
          supplierList.push(supplier);
        }

        setSuppliers(supplierList);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Registered Suppliers</h2>
      {suppliers.length === 0 ? (
        <p className="text-gray-600">No suppliers registered yet.</p>
      ) : (
        <ul className="space-y-2">
          {suppliers.map((s, index) => (
            <li key={index} className="p-2 border rounded">
              <strong>Name:</strong> {s.name} <br />
              <strong>Data:</strong> {s.data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
