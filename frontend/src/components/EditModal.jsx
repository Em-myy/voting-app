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
      <div className="text-[24px]">
        <h2 className="text-center">Edit Candidate</h2>
        <form onSubmit={handleSubmit}>
          <div>
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

          <div>
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
          <button type="submit">Submit Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
