import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const TaskUpdateForm = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = () => {
    onUpdate(task.id, { title, description });
  };

  return (
    <Modal
      open={!!task} 
      onClose={onCancel}
      aria-labelledby="edit-task-modal"
      aria-describedby="modal-for-editing-task"

    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,

        }}
      >
        <h3>Edit Task</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "16px",
          }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{
            display: "block",
            width: "100%",
            height: "80px",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "16px",
          }}
        />
        <div>
          <button
            onClick={handleSubmit}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskUpdateForm;
