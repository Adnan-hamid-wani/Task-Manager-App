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

  const styles = {
    container: {
      backgroundImage:
        "url('https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(0px)",
    },
    content: {
      position: "relative",
      zIndex: 1,
      padding: "20px",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(134, 206, 235, 0.6)",
      padding: "10px 20px",
      marginBottom: "50px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
      borderRadius: "5px",
    },
    searchInput: {
      flex: 1,
      maxWidth: "400px",
      padding: "8px 10px",
      borderRadius: "20px",
      border: "1px solid #ccc",
      margin: "0 20px",
    },
    logoutButton: {
      background: "red",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: "black",
      gap: "3px",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.navbar}>
          <h2 style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
            Task Manager
          </h2>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
            <LogoutRoundedIcon />
          </button>
        </div>

        {loading ? (
          <div style={styles.loader}>
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
