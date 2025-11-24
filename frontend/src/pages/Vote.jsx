import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Vote = () => {
  const [candidate, setCandidate] = useState([]);
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/candidates");
        setCandidate(res.data);
      } catch (error) {
        setMsg("Failed to load candidates");
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async (event) => {
    event.preventDefault();
    if (!selected) {
      return setMsg("Please select a candidate");
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/vote",
        { candidateId: selected },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMsg(res.data.msg);
    } catch (error) {
      setMsg(error.response?.data?.msg || "Vote Failed");
    }
  };

  const handleLogout = () => {
    logout();
    Navigate("/home");
  };

  return (
    <div>
      <h2>Vote for a candidate</h2>
      <form onSubmit={handleVote}>
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
        >
          <option value="">Select a candidate</option>
          {candidate.map((index) => (
            <option key={index._id} value={index._id}>
              {index.name} ({index.party || "Independent"})
            </option>
          ))}
        </select>
        <button type="submit">Submit Vote</button>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Vote;
