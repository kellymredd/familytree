import firebase from "firebase/app";
import "firebase/firestore";

// need to optimize queries (only return data we need displayed, etc)
// const appConfig = null;
const appConfig = {
  apiKey: "AIzaSyAXxthH88U-fyZCCEFq86kVR97S8A-K-c0",
  authDomain: "roots-fs.firebaseapp.com",
  projectId: "roots-fs",
  storageBucket: "roots-fs.appspot.com",
  messagingSenderId: "803644816326",
  appId: "1:803644816326:web:22ca7fe74051500fcf50c7",
  measurementId: "G-FYDJHVEDQN"
};

const SafeGET = Boolean(appConfig);

export default function rootsProject() {
  if (!appConfig) {
    return { SafeGET };
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(appConfig);
  } else {
    firebase.app();
  }

  const db = firebase.firestore();
  const userDbCollection = db.collection("users");
  const eventsDbCollection = db.collection("events");

  return { userDbCollection, eventsDbCollection, SafeGET };
}
