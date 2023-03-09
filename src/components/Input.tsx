import React, {useContext, useState} from "react";
import Img from "../assets/img.png";
import Attach from "../assets/attach.png";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {db, storage} from "../firebase";
import {v4 as uuid} from "uuid";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<Blob | Uint8Array | ArrayBuffer | null>(null);

  const {currentUser}: any = useContext(AuthContext);
  const {data}: any = useContext(ChatContext);
  // console.log("data: ", data);

  const handleSend = async () => {
    if(!img && !text) {
      alert("Please type something")
    }
    else if (img) {
      // Add msg+img to chats collection
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      // Add msg to chats collection
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // Add lastMsg for both users on userChat collection
    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="h-[50px] p-[10px] bg-white flex items-center justify-between gap-[10px] px-4">
      <input
        type="text"
        placeholder="Type here..."
        className="w-[80%] outline-none text-[14px] text-navbarBg placeholder:text-[14px]"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        value={text}
      />
      <div className="w-[20%] flex items-center justify-end gap-[10px]">
        <input
          type="file"
          id="fileAttach"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setImg(e.target.files ? e.target.files[0] : null)
          }
        />
        <label htmlFor="fileAttach">
          <img
            src={Img}
            alt="gallery"
            className="w-[24px] object-cover cursor-pointer"
          />
        </label>
        <button className="py-[5px] px-[15px] text-white bg-darkBlue hover:bg-navbarBg rounded-sm" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
