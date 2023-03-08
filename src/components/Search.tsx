import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
type User = {
  displayName: string;
  photoURL: string;
  uid: number;
};

const Search = () => {
  const [username, setUserName] = useState("");
  // const [user, setUser] = useState<User>({} as User) // this is also valid
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState(false);

  const {currentUser}: any = useContext(AuthContext);

  const handleSearch = async (): Promise<void> => {
    // Create a query.
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", username));

    // Execute query to get results
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docData: any) => {
        setUser(docData.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user!.uid
        ? currentUser.uid + user!.uid
        : user!.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Create currentUser chats
        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user!.uid,
            displayName: user!.displayName,
            photoURL: user!.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // Create user chats
        await updateDoc(doc(db, "userChat", user!.uid.toString()), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("")
  };

  return (
    <div className="border-b-[1px] border-solid border-gray">
      <div className="p-[10px]">
        <input
          type="text"
          placeholder="Find a user"
          className="bg-transparent text-white outline-none placeholder:text-[12px] text-[12px]"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
          value={username}
          onKeyDown={handleKey}
        />
      </div>
      {err && (
        <span className="pl-2 text-[15px] text-red-600 text-center">
          Something went wrong!
        </span>
      )}

      {user && (
        <div
          className="p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-navbarBg"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-[45px] h-[45px] rounded-full object-cover"
          />
          <div className="userChatinfo">
            <span className="text-[15px] font-medium">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;