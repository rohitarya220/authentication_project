import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Spin } from "antd";
import toast from "react-hot-toast";

const Login = () => {
  const { Login, isLogIn, navigate, loading } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLogIn) {
      navigate("/");
    }
  }, [isLogIn, navigate]);

  const handleLogin = () => {
    if (email && password) {
      Login({ email, password });
    } else {
      toast.error("Please enter details");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="md:w-full max-w-md mt-12">
        <div className="bg-white shadow-md rounded-lg md:px-8 px-10 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Log In</h1>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none p-2 mt-3 mb-4 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-700 focus:ring focus:ring-red-700 focus:ring-opacity-50 pl-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Enter Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none p-2 mt-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-700 focus:ring focus:ring-red-700 focus:ring-opacity-50 pl-2"
              required
            />
          </div>
          <div>
            <button
              type="button"
              className="w-full mt-5 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 outline-none"
              onClick={handleLogin}
            >
              {loading.login ? <Spin size="small" /> : "Login"}
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            You don't have an account?{" "}
            <NavLink to="/register" className="text-red-700 font-medium hover:underline">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
