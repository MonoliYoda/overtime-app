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
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const FirebaseContext = React.createContext();

export function useAuth() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

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

  async function getUserJobs() {
    console.log("Fetching jobs...");
    const userJobs = await getDocs(
      collection(db, "users", currentUser.uid, "jobs")
    );
    const result = [];
    userJobs.forEach((job) => result.push({ id: job.id, ...job.data() }));
    return result;
  }
  async function getOpenJobs() {
    console.log("getOpenJob");
    const q = query(
      collection(db, "users", currentUser.uid, "jobs"),
      where("endTime", "==", null),
      orderBy("startTime", "desc")
      //limit(1)
    );
    const openJobs = await getDocs(q);
    let result = [];
    openJobs.forEach((job) => {
      result.push({ id: job.id, ...job.data() });
    });
    return await Promise.all(
      result.map(async (job) => {
        if (job.project) {
          const project = await getDoc(job.project);
          return { ...job, project: project.data() };
        } else {
          return { ...job, project: null };
        }
      })
    );
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
    signup,
    login,
    logout,
    getUserJobs,
    getUserData,
    getOpenJobs,
  };
  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext };
