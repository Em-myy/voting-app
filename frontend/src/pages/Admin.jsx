import { useEffect, useState } from "react";
import axiosInstance, { adminSetupAxiosInterceptors } from "./axios.js";
import { useAdmin } from "../context/AdminContext";
import ChartComponent from "../components/ChartComponent.jsx";
import { io } from "socket.io-client";
import EditModal from "../components/EditModal.jsx";

const Admin = () => {
  const [addCandidates, setAddCandidates] = useState({ name: "", party: "" });
  const [candidateResult, setCandidateResult] = useState([]);
  const { logout, admin } = useAdmin();
  const [msg, setMsg] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [editShowMenu, setEditShowMenu] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    party: "",
  });

  useEffect(() => {
    adminSetupAxiosInterceptors(admin) ||
      adminSetupAxiosInterceptors(localStorage.getItem("adminToken"));
  }, []);

  const handleAddCandidates = (event) => {
    setAddCandidates({
      ...addCandidates,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitCandidates = async (event) => {
    event.preventDefault();

    try {
      if (!admin) {
        console.log("No token found");
        return;
      }

      const res = await axiosInstance.post("/candidates", addCandidates);
      setAddCandidates({ name: "", party: "" });
      setCandidateResult((prev) => [...prev, res.data.newCandidate]);
      setMsg("Candidate added successfully");
      setShowMenu(true);
    } catch (error) {
      setMsg("Error adding candidate");
      setShowMenu(true);
    }
  };

  useEffect(() => {
    const fetchResults = () => {
      try {
        if (!admin) return;

        const socket = io("http://localhost:3000");
        socket.on("results", (data) => {
          setCandidateResult(data);
        });

        return () => {
          socket.disconnect();
          console.log("Socket disconnected");
        };
      } catch (error) {
        console.log(error);
      }
    };

    if (admin) {
      fetchResults();
    }
  }, [admin]);

  const handleEdit = async (event) => {
    const clickedButton = event.currentTarget;

    const candidateId = clickedButton.dataset.id;

    try {
      const res = await axiosInstance.get(`/candidates/details/${candidateId}`);

      setCandidateDetails({
        name: res.data.candidate.name,
        party: res.data.candidate.party,
      });
      setEditShowMenu(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event) => {
    const clickedButton = event.currentTarget;

    const candidateId = clickedButton.dataset.id;

    try {
      await axiosInstance.delete(`/candidates/delete/${candidateId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-[100%] items-center px-2 py-8">
        <h1 className="text-6xl mb-2">Add Candidates</h1>
        <div className="w-[70%] bg-[#F6F6F6] rounded-xl p-12">
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
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
      {editShowMenu ? <EditModal candidateDetails={candidateDetails} /> : null}
      <div className="flex justify-center">
        <div>
          {candidateResult.map((candidate) => (
            <div key={candidate._id} className="flex gap-x-4 justify-center">
              <div>{candidate.name}</div>
              <div>{candidate.party}</div>
              <div>{candidate.votes}</div>
              <button
                data-id={candidate._id}
                type="button"
                onClick={(event) => handleEdit(event)}
              >
                Edit
              </button>
              <button
                data-id={candidate._id}
                type="button"
                onClick={(event) => handleDelete(event)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="w-[500px] h-[500px] cursor-pointer">
          <ChartComponent
            dataArray={candidateResult}
            labelKey="name"
            valueKey="votes"
            chartLabel="Election Results"
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
