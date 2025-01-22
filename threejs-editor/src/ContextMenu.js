import React from "react";

const ContextMenu = ({ position, onMove, onEdit, onClose }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        background: "white",
        border: "1px solid #ccc",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        padding: "10px",
      }}
      onClick={(e) => e.stopPropagation()} // Остановка всплытия событий, чтобы меню не закрывалось
    >
      <button onClick={() => onMove("up")}>Move Up</button>
      <button onClick={() => onMove("down")}>Move Down</button>
      <button onClick={() => onMove("left")}>Move Left</button>
      <button onClick={() => onMove("right")}>Move Right</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ContextMenu;
