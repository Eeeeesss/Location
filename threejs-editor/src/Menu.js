import React from "react";

const Menu = ({ onCreatePlane, onCreateObject }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#333",
        color: "#fff",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        zIndex: 10,
      }}
    >
      <button onClick={onCreatePlane}>Create Plane</button>
      <button onClick={() => onCreateObject("wall")}>Create Wall</button>
      <button onClick={() => onCreateObject("door")}>Create Door</button>
      <button onClick={() => onCreateObject("window")}>Create Window</button>
      <button onClick={() => onCreateObject("furniture")}>Create Furniture</button>
    </div>
  );
};

export default Menu;
