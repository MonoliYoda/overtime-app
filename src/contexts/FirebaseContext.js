import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";

const FirebaseContext = React.createContext();

export function useAuth() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userProjects, setUserProjects] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [userClients, setUserClients] = useState([]);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function getUserData() {
    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    return userDoc.data();
  }

  async function fetchAndParse(query) {
    const docs = await getDocs(query);
    let result = [];
    docs.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }

  async function fetchUserJobs() {
    const q = query(
      collection(db, "users", currentUser.uid, "jobs"),
      orderBy("startTime", "desc")
    );
    let jobs = await fetchAndParse(q);
    jobs = await Promise.all(
      jobs.map(async (job) => {
        if (job.project) {
          const project = await getDoc(job.project);
          return { ...job, project: project.data() };
        } else {
          return { ...job, project: null };
        }
      })
    );
    setUserJobs(jobs);
    return jobs;
  }

  function openJobs() {
    return userJobs.filter((job) => job.endTime == null);
  }

  function completedJobs() {
    return userJobs.filter((job) => job.endTime != null);
  }

  async function addNewJob(data) {
    if (data.project) {
      // Convert project object to actual doc reference
      data.project = doc(
        db,
        "users",
        currentUser.uid,
        "projects",
        data.project.id
      );
    }
    const docRef = await addDoc(
      collection(db, "users", currentUser.uid, "jobs"),
      data
    );
    return docRef;
  }

  async function fetchUserProjects() {
    const q = query(collection(db, "users", currentUser.uid, "projects"));
    let projects = await fetchAndParse(q);
    setUserProjects(projects);
    return projects;
  }

  async function addNewProject(data) {
    const docRef = await addDoc(
      collection(db, "users", currentUser.uid, "projects"),
      data
    );
    fetchUserProjects();
    return docRef;
  }

  async function fetchUserClients() {
    const q = query(collection(db, "users", currentUser.uid, "clients"));
    let clients = await fetchAndParse(q);
    setUserClients(clients);
    return clients;
  }

  async function addNewClient(data) {
    const docRef = await addDoc(
      collection(db, "users", currentUser.uid, "clients"),
      data
    );
    fetchUserClients();
    return docRef;
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProjects,
    userJobs,
    userClients,
    signup,
    login,
    logout,
    fetchUserJobs,
    getUserData,
    openJobs,
    completedJobs,
    addNewJob,
    fetchUserProjects,
    addNewProject,
    fetchUserClients,
    addNewClient,
  };
  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext };
