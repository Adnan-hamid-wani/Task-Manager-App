import React, { useState } from "react";
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addTask({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
  <input
    type="text"
    placeholder="Task Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{
      padding: "8px 40px 8px 30px", // Add extra padding on the right for the icon
      borderRadius: "6px",
      border: "none",
      background: "black",
      color: "white",
      marginBottom: "10px",
      width: "100px", // Adjust width as needed
      marginRight:"10px",
      display:"flex",
      
    }}
  />
  <DriveFileRenameOutlineRoundedIcon
    style={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-70%)", // Vertically center the icon
      color: "white", // Set the color of the icon
      marginLeft:"5px",
      height:"30px",
      widht:"20px"
 // Set the color o

    }}
  />
</div>

<div style={{ position: "relative", display: "inline-block" }}>
  <input
    type="text"
    placeholder="Task Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    style={{
      padding: "8px 40px 8px 30px", // Add extra padding on the right for the icon
      borderRadius: "6px",
      border: "none",
      background: "black",
      color: "white",
      marginBottom: "10px",
      width: "100%", // Adjust width as needed
      marginRight:"10px",
      display:"flex",
    }}
  />
  <DescriptionRoundedIcon
    style={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-70%)", // Vertically center the icon
      color: "white", // Set the color of the icon
      marginLeft:"5px",
      height:"30px",
      widht:"20px"
 // Set the color of the icon
    }}
  />
</div>

      <button type="submit" style={{ padding: "8px 16px" ,borderRadius:"6px" ,border:"none" ,cursor:"pointer" , background:"skyblue", alignContent:"center" , textAlign:"center", alignItems:"center",height:"40px" ,     display: "flex", marginTop:"10px"
}}>
        Add Task <AddTaskRoundedIcon  style={{height: "20px"}} />
      </button>
    </form>
  );
};

export default AddTask;
