import { useEffect, useState } from "react";
import axios from "axios";
import { useAdmin } from "../context/AdminContext";

const Admin = () => {
  const [addCandidates, setAddCandidates] = useState({ name: "", party: "" });
  const [candidateResult, setCandidateResult] = useState([]);
  const { logout, loading, admin } = useAdmin();

  useEffect(() => {
    if (admin) {
      const token = localStorage.getItem("adminToken");
    }
  }, [admin]);

  const handleAddCandidates = (event) => {
    setAddCandidates({
      ...addCandidates,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitCandidates = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      console.log("Token from localstorage: " + token);

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/candidates",
        addCandidates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Candidates added successfully");
      setAddCandidates({ name: "", party: "" });
      setCandidateResult((prev) => [...prev, res.data.newCandidate]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) return;

        const res = await axios.get("http://localhost:3000/api/candidates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCandidateResult(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (admin) {
      fetchResults();
    }
  }, [admin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col w-[100%] items-center px-2 py-8">
        <h1 className="text-6xl mb-2">Add Candidates</h1>
        <div className="w-[70%] bg-[#F6F6F6] rounded-md p-12">
          <form onSubmit={handleSubmitCandidates}>
            <div className="flex flex-col mb-2">
              <label className="text-[24px]">Candidate Name:</label>
              <input
                type="text"
                onChange={handleAddCandidates}
                name="name"
                value={addCandidates.name}
                placeholder="Candidate Name"
                className="text-black text-[24px] focus:outline-none border-2 border-gray-300 p-[5px] rounded-xl"
                required
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-[24px]">Candidate Party</label>
              <input
                type="text"
                onChange={handleAddCandidates}
                name="party"
                value={addCandidates.party}
                placeholder="Candidate party"
                className="text-black text-[24px] focus:outline-none border-2 border-gray-300 p-[5px] rounded-xl"
                required
              />
            </div>

            <div className="flex flex-col gap-y-4 text-white">
              <button
                type="submit"
                className="bg-indigo-700 text-[25px] cursor-pointer transition duration-200 rounded-xl active:scale-110 active:shadow-xl"
              >
                Add Candidates
              </button>
              <button
                onClick={logout}
                type="button"
                className="bg-red-700 text-[25px] cursor-pointer transition duration-200 rounded-xl active:scale-110 active:shadow-xl"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        {candidateResult.map((candidate) => (
          <div key={candidate._id}>
            <div>{candidate.name}</div>
            <div>{candidate.party}</div>
            <div>{candidate.votes}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
