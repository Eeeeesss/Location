import React, { useState } from "react";

const PlaneForm = ({ onSubmit, onClose }) => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!length || !width) {
      alert("Please provide valid dimensions for the plane.");
      return;
    }

    onSubmit(parseFloat(length), parseFloat(width));
    onClose(); // Закрываем форму после успешной отправки
  };

  return (
    <div style={{ position: "absolute", top: "10px", left: "10px", background: "white", padding: "10px", zIndex: 10 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Length (m):
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              step="0.1"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Width (m):
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              step="0.1"
              required
            />
          </label>
        </div>
        <button type="submit">Create Plane</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PlaneForm;
