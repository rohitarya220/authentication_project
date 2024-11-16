import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Spin, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Register = () => {
  const { registerUser, isLogIn, navigate, loading } = useStateContext();

  useEffect(() => {
    if (isLogIn) {
      navigate("/");
    }
  }, [isLogIn, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderSelect = (e) => {
    setFormData({
      ...formData,
      gender: e.key,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  const genderMenu = (
    <Menu onClick={handleGenderSelect}>
      <Menu.Item key="Male">Male</Menu.Item>
      <Menu.Item key="Female">Female</Menu.Item>
      <Menu.Item key="Other">Other</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              required
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              required
            />
            <Dropdown overlay={genderMenu} trigger={["click"]}>
              <button
                type="button"
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-left flex justify-between items-center transition"
              >
                {formData.gender || "Select Gender"} <DownOutlined />
              </button>
            </Dropdown>
          </div>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-medium py-3 rounded-md hover:bg-red-500 transition duration-300 focus:outline-none"
          >
            {loading.register ? <Spin size="small" /> : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-red-600 font-medium hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
