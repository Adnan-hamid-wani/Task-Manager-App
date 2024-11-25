import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance

const taskCollectionRef = collection(db, "tasks"); // Reference to Firestore tasks collection

// Create task
export const createTask = async (title, description) => {
  try {
    const docRef = await addDoc(taskCollectionRef, {
      title,
      description,
      completed: false, // Add completed field
    });
    console.log("Task created with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding task:", e);
  }
};

// Read tasks
export const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(taskCollectionRef);
    const tasks = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return tasks; // Return tasks as an array
  } catch (e) {
    console.error("Error getting tasks:", e);
    return [];
  }
};

// Update task (for completeness, we’ll mark tasks as completed or edit title/description)
export const updateTask = async (id, updatedData) => {
  const taskDocRef = doc(db, "tasks", id);
  try {
    await updateDoc(taskDocRef, updatedData);
    console.log("Task updated");
  } catch (e) {
    console.error("Error updating task:", e);
  }
};

// Delete task
export const deleteTask = async (id) => {
  const taskDocRef = doc(db, "tasks", id);
  try {
    await deleteDoc(taskDocRef);
    console.log("Task deleted");
  } catch (e) {
    console.error("Error deleting task:", e);
  }
};
