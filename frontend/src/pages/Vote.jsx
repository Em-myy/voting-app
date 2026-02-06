import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { io } from "socket.io-client";

const Vote = () => {
  const [candidate, setCandidate] = useState([]);
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/candidates`);
        setCandidate(res.data);
      } catch (error) {
        setMsg("Failed to load candidates");
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchResults = () => {
      try {
        if (!user) return;

        const socket = io(API_URL);
        socket.on("results", (data) => {
          setCandidate(data);
        });

        return () => {
          socket.disconnect();
          console.log("Socket disconnected");
        };
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchResults();
    }
  }, [user]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (user?.token) {
        try {
          const res = await axios.get(
            `${API_URL}/api/authentication/profile`,

            { headers: { Authorization: `Bearer ${user.token}` } },
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
        `${API_URL}/api/vote`,
        { candidateId: selected },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setShowMenu(true);
      setMsg(res.data.msg);
    } catch (error) {
      setShowMenu(true);
      setMsg(error.response?.data?.msg || "Vote Failed");
    }
  };

  return (
    <div className="bg-[#898989] min-h-screen text-white p-2">
      <div>
        <Navbar />
      </div>
      <div>
        <h1 className="text-center text-6xl mt-2">
          Welcome {userDetails.username}
        </h1>
      </div>

      <div className="mt-2 flex flex-col items-center justify-center px-4">
        <h2 className="text-center text-3xl">Vote for a candidate</h2>
        <form onSubmit={handleVote} className="w-full max-w-md">
          <div className="mt-8">
            <select
              value={selected}
              onChange={(event) => setSelected(event.target.value)}
              className="w-full text-[24px] focus:outline-none focus:ring-2 focus:ring-[#CEE8F5] p-2 text-gray-700 cursor-pointer rounded-2xl"
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

          <button
            type="submit"
            className="cursor-pointer text-[24px] text-white dark:text-black bg-[#2F46F5] dark:bg-[#CEE8F5] rounded-lg p-2 w-full mt-[250px]"
          >
            Submit Vote
          </button>
        </form>
      </div>
      {showMenu ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xl mb-4">{msg}</p>
            <button
              onClick={() => setShowMenu(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer transition duration-200 active:scale-110 active:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
      <div className="shadow-xl">
        <Footer />
      </div>
    </div>
  );
};

export default Vote;
