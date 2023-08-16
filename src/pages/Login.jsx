import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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

  async function logOut() {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="text text-center h-screen">
      <h1 className="my-4 text-lg capitalize">Sign in to your account</h1>
      <form className="flex flex-col items-center ">
        <input
          name="email"
          onChange={handleChange}
          className="rounded text-center text-base text-gray-500 capitalize border-2 border-gray-500 p-2 mx-8
          dark:bg-[#121212] dark:text-gray-300 sm:w-[30%] lg:w-[30%]"
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          className="rounded text-center text-base text-gray-500 capitalize border-2 border-gray-500 p-2 m-8
          dark:bg-[#121212] dark:text-gray-300 sm:w-[30%] lg:w-[30%]"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button
          onClick={handleSubmit}
          className="border-2 border-green-500 rounded-md p-4 w-1/4 sm:w-[20%] lg:w-[20%]"
        >
          Sign In
        </button>
        {/* TODO: log out interface */}
        <button
          className="border-2 border-gray-500 rounded-md p-4 mt-6 w-1/4 sm:w-[20%] lg:w-[20%] hidden"
          onClick={logOut}
        >
          Sign Out
        </button>
        <p className="mt-4 uppercase">or</p>
        <button
          className="border-2 border-red-500 rounded-md p-4 mt-4 w-1/4 sm:w-[20%] lg:w-[20%]"
          onClick={googleAuth}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
