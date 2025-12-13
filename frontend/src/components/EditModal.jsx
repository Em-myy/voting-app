import { useState } from "react";

const EditModal = () => {
  const [editedForm, setEditedForm] = useState({ name: "", party: "" });

  const handleChange = (event) => {
    setEditedForm({ ...editedForm, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <button>Close</button>
      <div>
        <h2>Edit Candidate</h2>
        <form>
          <div>
            <label>Candidate Name</label>
            <input type="text" placeholder="Candidate Name" />
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
