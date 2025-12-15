import { useEffect, useState } from "react";

const EditModal = (candidateDetails) => {
  const [editedForm, setEditedForm] = useState({
    name: candidateDetails.candidateDetails.name,
    party: candidateDetails.candidateDetails.party,
  });

  const handleChange = (event) => {
    setEditedForm({ ...editedForm, [event.target.name]: event.target.value });
  };

  const handleEdit = () => {
    console.log(editedForm);
  };
  return (
    <div>
      <button type="button" onClick={handleEdit}>
        Close
      </button>
      <div>
        <h2>Edit Candidate</h2>
        <form>
          <div>
            <label>Candidate Name</label>
            <input
              type="text"
              placeholder="Candidate Name"
              onChange={handleChange}
              required
              value={editedForm.name}
            />
          </div>

          <div>
            <label>Candidate Party</label>
            <input
              type="text"
              placeholder="Candidate Name"
              onChange={handleChange}
              required
              value={editedForm.party}
            />
          </div>
          <button>Submit Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
