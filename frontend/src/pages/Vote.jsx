import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const Vote = () => {
  const [candidate, setCandidate] = useState([]);
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState([]);

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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/authentication/profile",

          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setUserDetails(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
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

  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>
      <div>
        <h1 className="text-center text-2xl">Welcome {userDetails.username}</h1>
      </div>

      <div>
        <h2 className="text-center text-1xl">Vote for a candidate</h2>
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
        </form>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default Vote;
