import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { LogoutOutlined } from "@ant-design/icons";

const Home = () => {
  const { handleLogOut } = useStateContext();
  const [inputData, setInputData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    const arrays = e.target.value
      .split("],")
      .map((str) =>
        str
          .replace(/[\[\]]/g, "")
          .split(",")
          .map((num) => parseInt(num.trim(), 10))
      )
      .filter((array) => array.every((num) => !isNaN(num)));

    setInputData(arrays);
  };

  const findDistinctIntegers = (arrays) => {
    const flatArray = arrays.flat();
    const distinctIntegers = flatArray.filter(
      (num, _, arr) => arr.indexOf(num) === arr.lastIndexOf(num)
    );
    setResult(distinctIntegers);
  };

  const handleSaveClick = () => {
    if (inputData.length > 0) {
      findDistinctIntegers(inputData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Welcome, Rohit</h3>
        <button
          onClick={handleLogOut}
          className="p-2 bg-white text-blue-700 rounded-full flex items-center hover:bg-gray-100 transition"
        >
          <LogoutOutlined className="mr-2" />
          <span>Logout</span>
        </button>
      </div>

      <div className="flex flex-col items-center w-full max-w-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          Find Distinct Integers
        </h2>
        <div className="w-full">
          <label
            htmlFor="arrayInput"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter Arrays
          </label>
          <input
            id="arrayInput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder=" [1, 2, 3], [2, 3, 4], [3, 4, 5]"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button
          onClick={handleSaveClick}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Show Result
        </button>
        <div className="w-full mt-6">
          <h3 className="text-gray-800 font-semibold">Result</h3>
          <div className="bg-gray-100 p-4 rounded-md border border-gray-300 mt-2">
            {result.length > 0 ? (
              <pre className="text-gray-800">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500 italic">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
