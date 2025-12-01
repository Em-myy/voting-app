import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Vote = () => {
  const [candidate, setCandidate] = useState([]);
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

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
      if (user?.token) {
        try {
          const res = await axios.get(
            "http://localhost:3000/api/authentication/profile",

            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          setUserDetails(res.data.user);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchDetails();
  }, [user]);

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
      setShowMenu(true);
      setMsg(res.data.msg);
    } catch (error) {
      setMsg(error.response?.data?.msg || "Vote Failed");
    }
  };

  return (
    <div className="bg-[#919191] min-h-screen text-white">
      <div>
        <Navbar />
      </div>
      <div>
        <h1 className="text-center text-6xl mt-2">
          Welcome {userDetails.username}
        </h1>
      </div>

      <div className="mt-2 flex flex-col items-center ">
        <h2 className="text-center text-3xl">Vote for a candidate</h2>
        <form onSubmit={handleVote}>
          <div className="mt-4">
            <select
              value={selected}
              onChange={(event) => setSelected(event.target.value)}
              className="text-[24px] focus:outline-none focus:ring-2 focus:ring-[#CEE8F5] p-2 text-gray-700 cursor-pointer rounded-2xl"
            >
              <option value="" className="">
                Select a candidate
              </option>
              {candidate.map((index) => (
                <option key={index._id} value={index._id}>
                  {index.name} ({index.party || "Independent"})
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit Vote</button>
        </form>
      </div>
      <div>
        {showMenu ? (
          <div>
            <div>{msg}</div>
            <div onClick={() => setShowMenu(false)}>Close</div>
          </div>
        ) : (
          <div>
            <div>{msg}</div>
            <div onClick={() => setShowMenu(false)}>
              {showMenu ? "Close" : ""}
            </div>
          </div>
        )}
      </div>
      <div className="md:fixed md:bottom-0 md:left-0 md:w-full mt-[50px] md:mt-0p-2 shadow-xl">
        <Footer />
      </div>
    </div>
  );
};

export default Vote;
