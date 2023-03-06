import React, {useState} from "react";
import logo from "../assets/logo.png";
import addAvatar from "../assets/addAvatar.png";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="bg-dimGray h-screen flex justify-center items-center">
      <div className="bg-white px-[20px] py-[60px] rounded-[10px] flex items-center flex-col gap-2">
        <img src={logo} alt="logo" />
        <span className="text-darkBlue text-[14px]">Login</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[15px] text-[14px]"
        >
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

          <button className="bg-buttonBg text-white p-[10px] font-bold hover:bg-darkBlue mt-[10px]">
            Sign in
          </button>
          {err && (
            <span className="text-red-600 text-center">
              Something went wrong!
            </span>
          )}
        </form>
        <p className="text-darkBlue text-[12px] mt-[10px]">
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
