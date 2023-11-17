import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateElection = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Basic input validation
      if (!title || !date || !description) {
        setError("Please fill in all fields");
        return;
      }

      setError(""); // Clear previous error, if any

      await axios.post("/api/elections", {
        title,
        date,
        description
      });

      // Optionally, add logic to handle success (e.g., show a success message or clear the form)
      setTitle("");
      setDate("");
      setDescription("");
    } catch (error) {
      setError("Failed to create election");
      console.error("Failed to create election:", error.message);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleCreateElection}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Create Election</button>
      </form>
    </div>
  );
};

export default AdminPage;
