import {createContext, useEffect, useState, ReactNode} from "react";
import {auth} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";

type AuthProviderProps = {
  children?: ReactNode;
};

// export const AuthContext = createContext()
export const AuthContext = createContext({});

export const AuthContextProvider = ({children}: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState({});

  // setCurrentUser depending on logged in/out using firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      console.log('user:', user);
    });

    return () => {
      unsub();
    };

  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
