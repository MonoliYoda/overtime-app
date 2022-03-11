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
  async function getOpenJob() {
    console.log("getOpenJob");
    const q = query(
      collection(db, "users", currentUser.uid, "jobs"),
      where("endTime", "==", null)
      //  orderBy("startTime")
    );
    const openJobs = await getDocs(q);
    const result = [];
    openJobs.forEach(async (job) => {
      let jobData = await job.data();
      let project = null;
      if (jobData.project) {
        project = await (await getDoc(jobData.project)).data();
      }
      result.push({ id: job.id, ...job.data(), project: project });
    });
    return result;
  }

  function strfDate(timestamp) {
    const date = new Date(timestamp.toDate());
    return date.toLocaleDateString();
  }
  function strfTime(timestamp) {
    try {
      const date = new Date(timestamp.toDate());
      return date.toLocaleTimeString();
    } catch (e) {
      return "-";
    }
  }

  function strfRuntime(start, end) {
    try {
      const t1 = new Date(start.toDate());
      const t2 = new Date(end.toDate());
      const diff = (t2 - t1) / 1000;
      var hrs = Math.floor(diff / (60 * 60));
      var leftSec = diff - hrs * 60 * 60;
      var mins = Math.floor(leftSec / 60);
      if (mins < 10) {
        mins = "0" + mins;
      }
      return `Worktime: ${hrs}:${mins}`;
    } catch (e) {
      return "-";
    }
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
    getOpenJob,
    strfDate,
    strfTime,
    strfRuntime,
  };
  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext };
