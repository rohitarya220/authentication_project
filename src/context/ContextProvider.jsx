import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import usersData from "../../user.json";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(
    JSON.parse(localStorage.getItem("isLogIn")) || false
  );
  const [loading, setLoading] = useState({ login: false, register: false });

  const registerUser = async (formdata) => {
    setLoading({ register: true });
    try {
      const { email, mobile } = formdata;
      const exists = usersData.users.find(
        (user) => user.email === email || user.mobile === mobile
      );
      if (exists) {
        toast.error("Email or phone number is already registered");
        return;
      }
      const { status } = await axios.post(
        `http://localhost:5000/users`,
        formdata
      );
      if (status === 201) {
        toast.success("User registered successfully");
        navigate("/login");
        setLoading({ register: false });
      }
    } catch (error) {
      console.error("Registration Error:", error.message);
      toast.error("An error occurred during registration");
    } finally {
      setLoading({ register: false });
    }
  };

  const Login = async (data) => {
    setLoading({ login: true });
    try {
      const { email, password } = data;
      const exists = usersData.users.find(
        (user) => user.email === email && user.password === password
      );

      if (exists) {
        toast.success("Logged in successfully");
        localStorage.setItem("isLogIn", true);
        setIsLogIn(true);
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error(error.message || "Login error");
    } finally {
      setLoading({ login: false });
    }
  };

  const handleLogOut = () => {
    setIsLogIn(false);
    localStorage.removeItem("isLogIn");
    navigate("/login");
  };

  useEffect(() => {
    if (!isLogIn) {
      localStorage.removeItem("isLogIn");
    }
  }, [isLogIn]);

  const value = {
    navigate,
    isLogIn,
    registerUser,
    loading,
    Login,
    handleLogOut,
  };

  return (
    // eslint-disable-next-line
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
