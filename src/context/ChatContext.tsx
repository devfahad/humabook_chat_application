import {createContext, ReactNode, useContext, useReducer} from "react";
import {AuthContext} from "./AuthContext";

type ChatProviderProps = {
  children?: ReactNode;
};

// export const ChatContext = createContext()
export const ChatContext = createContext({});

export const ChatContextProvider = ({children}: ChatProviderProps) => {
  const {currentUser}: any = useContext(AuthContext);

  const INITIAL_STATE = {
    user: {},
    chatId: "null",
  };

  type ACTIONTYPE = {type: "CHANGE_USER"; payload: any};

  const chatReducer = (state: typeof INITIAL_STATE, action: ACTIONTYPE) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default: 
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{data: state, dispatch}}>
      {children}
    </ChatContext.Provider>
  );
};
