import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleCreateElection = async (e) => {
    e.preventDefault();

    try {
      if (!title || !date || !description) {
        setError("Please fill in all fields");
        return;
      }

      setError("");

      await axios.post("/api/elections", {
        title,
        date,
        description,
      });

      setTitle("");
      setDate("");
      setDescription("");
    } catch (error) {
      setError("Failed to create election");
      console.error("Failed to create election:", error.message);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggles form visibility
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Admin Page</h1>
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={toggleForm}
      >
        Create Election
      </button>
      {showForm && (
        <div style={{ marginTop: "20px" }}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleCreateElection}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ display: "block", margin: "8px 0", padding: "8px" }}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ display: "block", margin: "8px 0", padding: "8px" }}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                display: "block",
                margin: "8px 0",
                padding: "8px",
                minHeight: "100px",
              }}
            ></textarea>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Create Election
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
