import React, {useState} from "react";
import logo from "../assets/logo.png";
import addAvatar from "../assets/addAvatar.png";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, storage, db} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any): Promise<void> => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Add a new user to "users" collection after registration
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChat", res.user.uid), {});
            navigate("/");
          } catch (err) {
            // console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="bg-dimGray h-screen flex justify-center items-center">
      <div className="bg-white px-[20px] py-[60px] rounded-[10px] flex items-center flex-col gap-2 max-w-[320px]">
        <img src={logo} alt="logo" />
        <span className="text-darkBlue text-[14px]">Register</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[15px] text-[14px]"
        >
          <input
            type="text"
            placeholder="Display name"
            className="p-4 border-b-[1px] border-dimBlue focus:border-darkBlue focus:outline-none min-w-[280px]"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-4 border-b-[1px] min-w-[280px] border-dimBlue focus:border-darkBlue focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 border-b-[1px] min-w-[280px] border-dimBlue focus:border-darkBlue focus:outline-none"
          />
          <input type="file" id="avatarImg" className="p-4 hidden" />
          <label
            htmlFor="avatarImg"
            className="flex items-center gap-[10px] text-[14px] cursor-pointer"
          >
            <img src={addAvatar} className="w-8" alt="Add avatar" />
            <span className="text-[#9ca3af]">Add an avatar</span>
          </label>
          <button
            className="bg-buttonBg text-white p-[10px] font-bold hover:bg-darkBlue mt-[10px]"
            disabled={loading}
          >
            Sign up
          </button>

          {loading && (
            <span className="text-gray-600 text-center">
              Uploading and compressing the image. Please wait...
            </span>
          )}

          {err && (
            <span className="text-red-600 text-center">
              Something went wrong!
            </span>
          )}
        </form>
        <p className="text-darkBlue text-[12px] mt-[10px]">
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
