import { useEffect, useState } from "react";
import axiosInstance, { adminSetupAxiosInterceptors } from "../pages/axios";

const EditModal = ({ candidateDetails }) => {
  const [editedForm, setEditedForm] = useState({
    name: "",
    party: "",
  });

  useEffect(() => {
    adminSetupAxiosInterceptors ||
      adminSetupAxiosInterceptors(localStorage.getItem("adminToken"));
  }, []);

  const handleChange = (event) => {
    setEditedForm({ ...editedForm, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setEditedForm({
      name: candidateDetails.name,
      party: candidateDetails.party,
    });
  }, [candidateDetails.name, candidateDetails.party]);

  const handleSubmit = async () => {
    const candidateId = candidateDetails.id;

    try {
      const res = await axiosInstance.patch(
        `/candidates/edit/${candidateId}`,
        editedForm
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center text-4xl mb-4">Edit Candidate</h2>
        <div className="text-[24px]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label>Candidate Name</label>
              <input
                type="text"
                placeholder="Candidate Name"
                onChange={handleChange}
                required
                value={editedForm.name}
                name="name"
                className="text-black focus:outline-none border-2 border-gray-300 p-[5px] rounded-xl"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label>Candidate Party</label>
              <input
                type="text"
                placeholder="Candidate Party"
                onChange={handleChange}
                required
                value={editedForm.party}
                name="party"
                className="text-black focus:outline-none border-2 border-gray-300 p-[5px] rounded-xl"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer transition duration-200 active:scale-110 active:shadow-xl"
              >
                Submit Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
