import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
// This config data should stored in env file. 
const firebaseConfig = {
  apiKey: "AIzaSyDctGahW8UMpsZBNfxCyqOQFy-VTGce4Vw",
  authDomain: "humabook-chat-application.firebaseapp.com",
  projectId: "humabook-chat-application",
  storageBucket: "humabook-chat-application.appspot.com",
  messagingSenderId: "163130531401",
  appId: "1:163130531401:web:2e23cefdacea5c4e7ce998",
};

// To help us with debugging later
if(!firebaseConfig.apiKey) throw new Error("Missing firebase credentials: apiKey")
if(!firebaseConfig.authDomain) throw new Error("Missing firebase credentials: authDomain")
if(!firebaseConfig.projectId) throw new Error("Missing firebase credentials: projectId")
if(!firebaseConfig.storageBucket) throw new Error("Missing firebase credentials: storageBucket")
if(!firebaseConfig.messagingSenderId) throw new Error("Missing firebase credentials: messagingSenderId")
if(!firebaseConfig.appId) throw new Error("Missing firebase credentials: appId")

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
