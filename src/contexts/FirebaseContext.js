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
  Timestamp,
  updateDoc,
  deleteDoc,
  setDoc,
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
  const [userOvtSchemes, setUserOvtSchemes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchUserJobs();
      fetchUserOvtSchemes();
    }
  }, []);

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
        let project = null;
        let client = null;
        let ovtScheme = null;
        if (job.project) {
          project = await getDoc(job.project);
          project = { id: project.id, ...project.data() };
        }
        if (job.client) {
          client = await getDoc(job.client);
          client = { id: client.id, ...client.data() };
        }
        if (job.ovtScheme) {
          ovtScheme = await getDoc(job.ovtScheme);
          ovtScheme = { id: ovtScheme.id, ...ovtScheme.data() };
        }
        if (job.startTime) job.startTime = new Date(job.startTime.toDate());
        if (job.endTime) job.endTime = new Date(job.endTime.toDate());
        return { ...job, project, client, ovtScheme };
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
    console.log(data);
    let project = null;
    let client = null;
    let ovtScheme = null;
    const defaultScheme = userOvtSchemes[0];
    if (data.project) {
      // Convert project object to actual doc reference
      project = doc(db, "users", currentUser.uid, "projects", data.project.id);
    }
    if (data.client) {
      // Convert client object to actual doc reference
      client = doc(db, "users", currentUser.uid, "clients", data.client.id);
    }
    if (data.ovtScheme) {
      // Convert ovtScheme object to actual doc reference
      ovtScheme = doc(
        db,
        "users",
        currentUser.uid,
        "ovtSchemes",
        data.ovtScheme.id
      );
    } else {
      ovtScheme = doc(
        db,
        "users",
        currentUser.uid,
        "ovtSchemes",
        userOvtSchemes[0].id
      );
    }
    const job = {
      name: data.name,
      project,
      client,
      startTime: Timestamp.fromDate(data.startTime),
      endTime: data.endTime ? Timestamp.fromDate(data.endTime) : null,
      ovtScheme: ovtScheme,
      personalRate: data.personalRate || 0,
      equipmentRate: data.equipmentRate || 0,
      notes: data.notes || "",
    };
    const docRef = await addDoc(
      collection(db, "users", currentUser.uid, "jobs"),
      job
    );
    fetchUserJobs();
    return docRef;
  }

  async function updateJob(job) {
    const data = {
      name: job.name,
      project: null,
      client: null,
      startTime: Timestamp.fromDate(job.startTime),
      endTime: job.endTime ? Timestamp.fromDate(job.endTime) : null,
      ovtScheme: null,
      personalRate: job.personalRate,
      equipmentRate: job.equipmentRate,
      notes: job.notes,
    };
    if (job.project) {
      // Convert project object to actual doc reference
      data.project = doc(
        db,
        "users",
        currentUser.uid,
        "projects",
        job.project.id
      );
    }
    if (job.client) {
      // Convert client object to actual doc reference
      data.client = doc(db, "users", currentUser.uid, "clients", job.client.id);
    }
    if (job.ovtScheme) {
      // Convert ovtScheme object to actual doc reference
      data.ovtScheme = doc(
        db,
        "users",
        currentUser.uid,
        "ovtSchemes",
        job.ovtScheme.id
      );
    }
    const docRef = doc(db, "users", currentUser.uid, "jobs", job.id);

    await updateDoc(docRef, data);
    fetchUserJobs();
    return docRef;
  }

  async function deleteJob(id) {
    const docRef = doc(db, "users", currentUser.uid, "jobs", id);
    await deleteDoc(docRef);
  }

  async function fetchUserProjects() {
    if (!currentUser) return false;
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
    if (!currentUser) return false;
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

  async function fetchUserOvtSchemes() {
    if (!currentUser) return false;
    const q = query(collection(db, "users", currentUser.uid, "ovtSchemes"));
    let schemes = await fetchAndParse(q);
    setUserOvtSchemes(schemes);
    return schemes;
  }

  async function addNewOvtScheme(data) {
    const docRef = await addDoc(
      collection(db, "users", currentUser.uid, "ovtSchemes"),
      data
    );
    fetchUserOvtSchemes();
    return docRef;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (!user) return;
      // Check if user has collections
      let userDocRef = doc(db, "users", user.uid);
      let userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        console.log("Initializing user database...");
        // Initialize user
        await setDoc(doc(db, "users", user.uid), { name: user.email });
      }
      let ovtCollectionRef = collection(db, "users", user.uid, "ovtSchemes");
      let ovtCollectionSnap = await getDocs(ovtCollectionRef);
      if (!ovtCollectionSnap.size) {
        await addDoc(collection(db, "users", user.uid, "ovtSchemes"), {
          name: "Reklama",
          stdHours: 11,
          scheme: [15, 15, 20, 20, 30, 50],
        });
        fetchUserOvtSchemes();
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProjects,
    userJobs,
    userClients,
    userOvtSchemes,
    signup,
    login,
    logout,
    fetchUserJobs,
    getUserData,
    openJobs,
    completedJobs,
    addNewJob,
    updateJob,
    deleteJob,
    fetchUserProjects,
    addNewProject,
    fetchUserClients,
    addNewClient,
    fetchUserOvtSchemes,
    addNewOvtScheme,
  };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext };
