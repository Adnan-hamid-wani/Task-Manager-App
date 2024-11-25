import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
  // Add task to context
  const addTask = (task) => setTasks((prevTasks) => [...prevTasks, task]);

  // Remove task from context
  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Update task in context
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
