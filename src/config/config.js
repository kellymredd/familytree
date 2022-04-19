import firebase from "firebase/app";
import "firebase/firestore";

// need to optimize queries (only return data we need displayed, etc)
const appConfig = null;

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
