import React, { useState } from "react";
import { FaAlignCenter, FaBars, FaTasks } from "react-icons/fa";

const MyTask = () => {
  const [opns, setOpns] = useState("hidden");
  const OptionHandle = () => {
    if (opns === "hidden") {
      setOpns("");
    } else {
      setOpns("hidden");
    }
  };
  return (
    <div className=" container mx-auto mt-5">
      <h1 className="text-2xl font-bold my-3">Your Task</h1>
      <div className="grid grid-cols-2">
        <div className="bg-violet-700 flex justify-between items-center text-white p-3 rounded-md">
          <div className="flex items-center">
            <FaTasks className="text-lg mr-3"></FaTasks>
            <h2 className="text-xl font-semibold">Task Title</h2>
          </div>
          <div className=" relative">
            <FaAlignCenter
              onClick={OptionHandle}
              className="text-lg cursor-pointer"
            />
            <ul
              className={`${opns} absolute bg-violet-500 m-0 p-0 top-8 rounded-lg right-0`}
            >
              <li className=" hover:bg-violet-800 px-5 py-3 rounded-lg">
                <button>Complite</button>
              </li>
              <li className=" hover:bg-violet-800 px-5 py-3 rounded-lg">
                <button>Update</button>
              </li>
              <li className=" hover:bg-violet-800 px-5 py-3 rounded-lg">
                <button>Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTask;
