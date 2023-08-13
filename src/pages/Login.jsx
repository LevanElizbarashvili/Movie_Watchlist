import React from "react";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="text text-center h-screen">
      <h1 className="my-4 text-lg capitalize">Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center ">
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
        <button className="border-2 border-gray-500 rounded-md p-4 w-1/4 sm:w-[20%] lg:w-[20%]">
          Log In
        </button>
      </form>
    </div>
  );
}
