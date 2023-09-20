import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function googleAuth(e) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut(e) {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(auth?.currentUser?.photoURL);

  const profile = (
    <div>
      <img
        src={auth?.currentUser?.photoURL}
        className="rounded-full w-[80px] m-auto mt-10"
      ></img>
      <button
        onClick={logOut}
        className=" bg-red-500 mt-16 text-white rounded-md p-4 w-56  shadow-md"
      >
        Log out
      </button>
    </div>
  );

  return (
    <div className="text text-center h-screen">
      {auth?.currentUser ? (
        profile
      ) : (
        <div>
          <h1 className="mt-16 mb-8 text-lg capitalize">
            Sign in to your account
          </h1>
          <form className="flex flex-col items-center ">
            <input
              name="email"
              onChange={handleChange}
              className="rounded text-center text-base text-gray-500 capitalize border-2 border-[#2e2e2F] p-2 mx-8
          dark:bg-[#2e2e2F] dark:text-gray-300 sm:w-[30%] lg:w-[30%] min-w-56"
              type="email"
              placeholder="Email address"
              value={loginFormData.email}
            />
            <input
              name="password"
              className="rounded text-center text-base text-gray-500 capitalize border-2 border-[#2e2e2F] p-2 m-8
          dark:bg-[#2e2e2F] dark:text-gray-300 sm:w-[30%] lg:w-[30%] min-w-56"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              value={loginFormData.password}
            />
            <button
              onClick={handleSubmit}
              className=" bg-green-500 text-white rounded-md p-4 w-56  shadow-md"
            >
              Sign In
            </button>
            <p className="mt-4 uppercase">or</p>
            <button
              className=" bg-gray-100 text-black rounded-md p-4 mt-4 w-56 flex items-center justify-center gap-2 shadow-md"
              onClick={googleAuth}
            >
              <FcGoogle className="w-6 h-6" />
              Sign in with Google
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
