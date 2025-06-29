import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { getContract } from "../utils/contract";

function Dashboard() {
  useEffect(() => {
    async function fetchOwner() {
      try {
        const { contract } = getContract();
        const owner = await contract.owner();
        console.log("Contract owner:", owner);
      } catch (err) {
        console.error("Error fetching owner:", err);
      }
    }
    fetchOwner();
  }, []);

  return (
    <div className="text-center mt-10">
      <Helmet>
        <title>Dashboard | Proof-Port</title>
        <meta name="description" content="Manage and verify supplier proofs on Proof-Port." />
      </Helmet>
      <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
      <p className="mt-4 text-gray-700">Open console to see contract owner address fetched from blockchain.</p>
    </div>
  );
}

export default Dashboard;