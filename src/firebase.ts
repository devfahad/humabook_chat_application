import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDctGahW8UMpsZBNfxCyqOQFy-VTGce4Vw",
  authDomain: "humabook-chat-application.firebaseapp.com",
  projectId: "humabook-chat-application",
  storageBucket: "humabook-chat-application.appspot.com",
  messagingSenderId: "163130531401",
  appId: "1:163130531401:web:2e23cefdacea5c4e7ce998",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
