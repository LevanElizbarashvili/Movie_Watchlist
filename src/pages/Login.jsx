import { useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogedIn, setisLogedIn] = useState(null);

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
      if (fetchSignInMethodsForEmail(auth?.currentUser?.email)) {
        await signInWithEmailAndPassword(
          auth,
          loginFormData.email,
          loginFormData.password
        );
        setisLogedIn(true);
      }
      await createUserWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password
      );
      setisLogedIn(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function googleAuth(e) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setisLogedIn(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      setisLogedIn(false);
    } catch (error) {
      console.error(error);
    }
  }

  const profile = (
    <div className="flex flex-col justify-center items-center bg-gray-200 dark:bg-[#2f3135] w-72 rounded-md p-8 m-auto mt-8">
      <img
        src={auth?.currentUser?.photoURL}
        className="rounded-full  mt-10"
      ></img>
      <p className="mt-4 font-medium text-gray-600 dark:text-gray-400">
        {auth?.currentUser?.displayName
          ? auth?.currentUser?.displayName
          : auth?.currentUser?.email}
      </p>
      <button
        onClick={logOut}
        className=" bg-red-500 mt-10 text-white rounded-md p-4 w-56  shadow-md"
      >
        Log out
      </button>
    </div>
  );

  return (
    <div className="text text-center h-screen">
      {auth?.currentUser || isLogedIn ? (
        profile
      ) : (
        <div>
          <h1 className="mt-16 mb-8 text-lg capitalize text-gray-600  dark:text-gray-400">
            Sign in to your account
          </h1>
          <form className="flex flex-col items-center ">
            <input
              name="email"
              onChange={handleChange}
              className="rounded text-center text-base text-gray-600  bg-gray-200 p-4 mx-8
                      dark:bg-[#2f3135] dark:text-gray-400  placeholder:text-gray-600 dark:placeholder:text-gray-400 
                        sm:w-[30%] lg:w-[30%] min-w-56"
              type="email"
              placeholder="Email address"
              value={loginFormData.email}
            />
            <input
              name="password"
              className="rounded text-center text-base text-gray-600  bg-gray-200 p-4 m-8
                        dark:bg-[#2f3135] dark:text-gray-400  placeholder:text-gray-600 dark:placeholder:text-gray-400 
                        sm:w-[30%] lg:w-[30%] min-w-56"
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
            <p className="mt-4 uppercase text-gray-600  dark:text-gray-400">
              or
            </p>
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
