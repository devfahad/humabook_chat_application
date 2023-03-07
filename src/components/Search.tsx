import React, {useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";

type User = {
  displayName: string;
  photoURL: string;
}

const Search = () => {
  const [username, setUserName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null)
  const [err, setErr] = useState<boolean>(false);

  const handleSearch = async (): Promise<void>  => {
    // Create a query.
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", username));

    // Execute query to get results
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: any): void => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="border-b-[1px] border-solid border-gray">
      <div className="p-[10px]">
        <input
          type="text"
          placeholder="Find a user"
          className="bg-transparent text-white outline-none placeholder:text-[12px] text-[12px]"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && (
        <span className="pl-2 text-[15px] text-red-600 text-center">Something went wrong!</span>
      )}

      {user && (
        <div className="p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-navbarBg">
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
