import { useEffect, useState } from "react";
import axios from "axios";
import { useAdmin } from "../context/AdminContext";

const Admin = () => {
  const [addCandidates, setAddCandidates] = useState({ name: "", party: "" });
  const [candidateResult, setCandidateResult] = useState([]);
  const { logout } = useAdmin();

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
    } catch (error) {
      console.log(error || "Error adding candidates");
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/candidates");
        setCandidateResult(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmitCandidates}>
        <input
          type="text"
          onChange={handleAddCandidates}
          name="name"
          value={addCandidates.name}
          placeholder="Candidate Name"
          required
        />
        <input
          type="text"
          onChange={handleAddCandidates}
          name="party"
          value={addCandidates.party}
          placeholder="Candidate party"
          required
        />

        <button type="submit">Add Candidates</button>
      </form>

      <button onClick={logout}>Logout of Admin Page</button>

      <div>
        {candidateResult.map((index) => (
          <div>
            <div key={index._id}>
              <div>{index.name}</div>
              <div>{index.party}</div>
              <div>{index.votes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
