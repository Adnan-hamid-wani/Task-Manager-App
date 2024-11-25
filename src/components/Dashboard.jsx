import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskUpdateForm from "./TaskUpdateForm";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const navigate = useNavigate();
  const tasksCollection = collection(db, "tasks");

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(tasksCollection);
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
        setFilteredTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Authentication check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle search
  useEffect(() => {
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchQuery, tasks]);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Add a new task
  const addTask = async (newTask) => {
    const docRef = await addDoc(tasksCollection, newTask);
    const updatedTasks = [...tasks, { id: docRef.id, ...newTask }];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, "tasks", taskId);
    await deleteDoc(taskDoc);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  // Update a task
  const handleUpdateTask = async (taskId, updatedData) => {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc, updatedData);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedData } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="content">
        {/* Navbar */}
        <div className="navbar">
          <h2
            className="logo"
            style={{ margin: 0, fontWeight: "bold", color: "#333" }}
          >
            Task Manager
          </h2>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchInput"
          />
          <button onClick={handleLogout} className="logoutButton">
            <LogoutRoundedIcon className="logout__icon" />
          </button>
        </div>

        {user && (
          <div className="welcomeMessage">{`welcome : ${user.email}`}</div>
        )}

        {loading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks match your search. Add a new task to get started!</p>
        ) : (
          <>
            <AddTask addTask={addTask} />

            {editingTask && (
              <div>
                <TaskUpdateForm
                  task={editingTask}
                  onUpdate={handleUpdateTask}
                  onCancel={() => setEditingTask(null)}
                />
              </div>
            )}
            <div
              style={{
                opacity: editingTask ? 0.5 : 1,
                pointerEvents: editingTask ? "none" : "auto",
              }}
            >
              <TaskList
                tasks={filteredTasks}
                handleDelete={deleteTask}
                handleEdit={setEditingTask}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
