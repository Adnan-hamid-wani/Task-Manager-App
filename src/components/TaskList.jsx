import React from "react";

const TaskList = ({ tasks, handleDelete, handleEdit }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Task List</h2>

      {tasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No tasks available. Add a new task!</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                background: "#f9f9f9",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ flex: "1", marginRight: "10px" }}>
                <strong style={{ fontSize: "18px", color: "#333" }}>{task.title}</strong>
                <p style={{ margin: "5px 0", color: "#555" }}>{task.description}</p>
              </div>

              <div>
                <button
                  onClick={() => handleEdit(task)}
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
