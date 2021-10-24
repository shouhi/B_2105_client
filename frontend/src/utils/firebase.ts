// v9 compat packages are API compatible with v8 code
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
};
// initializeを複数回走らせない
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
export { auth };
const storage = firebase.storage();
export { storage };
export default firebase;
