import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import {
  FaAlignCenter,
  FaBars,
  FaTasks,
  FaTrashAlt,
  FaUpload,
} from "react-icons/fa";
import { GrDocumentUpdate, GrUpdate } from "react-icons/gr";
import { GiCheckMark } from "react-icons/gi";

import { Link } from "react-router-dom";
import { AuthContext } from "../../Tools/ContentApi/UserContext";
import { toast } from "react-hot-toast";
import Loader from "../../Tools/Loader/Loader";

const MyTask = () => {
  const { user, loader } = useContext(AuthContext);

  const {
    data: Tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task"],
    queryFn: () =>
      fetch(
        `https://list-maker-server.vercel.app/task/?email=${user.email}`
      ).then((res) => res.json()),
  });
  //    delete tasks
  const deleteHander = (id) => {
    alert(id);

    fetch(`https://list-maker-server.vercel.app/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Task deleted successfully");
          refetch();
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  // complite task with
  const compliteHandler = (id) => {
    alert(id);

    fetch(`https://list-maker-server.vercel.app/complite/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Task Complete");
          refetch();
        }
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  //

  if (!Tasks) {
    return <Loader></Loader>;
  }
  return (
    <div className=" container mx-auto mt-5">
      <h1 className="text-2xl font-bold my-3">Your Task</h1>
      {Tasks.length === 0 && (
        <div className="flex justify-center text-red-700 text-xl">
          <p>Have Not Task</p>
        </div>
      )}
      {Tasks?.map((task) => (
        <div key={task._id} className="">
          <div className="shadow-xl bg-violet-700 text-white shadow-green-200 hover:border-0 hover:duration-500 duration-500 hover:shadow-2xl bg-base-100 rounded p-4 my-10">
            <div className="flex justify-between my-4">
              <div>
                <h1 className="text-3xl font-bold">{task?.title}</h1>
              </div>

              <div className="flex justify-center items-center">
                <Link
                  onClick={() => compliteHandler(task?._id)}
                  title="Press to Complete Task"
                  className="btn  hover:shadow-xl  p-2 rounded mr-2"
                >
                  <GiCheckMark />
                </Link>
                <Link
                  to={`/update/${task._id}`}
                  title="Press to Update Task"
                  className="btn  hover:shadow-xl  p-2 rounded mr-2"
                >
                  <FaUpload />
                </Link>

                <Link
                  onClick={() => deleteHander(task?._id)}
                  title="Press to Delete"
                  className="btn  p-2 hover:shadow-xl rounded mr-2"
                >
                  <FaTrashAlt></FaTrashAlt>
                </Link>
              </div>
            </div>
            <hr />
            <div className="flex justify-between">
              <h3 className="text-xl font-medium">{task?.taskDis}</h3>

              <div className="flex gap-3 mt-2 justify-end flex-col">
                <div className=" gap-3">
                  <p> Time: {task?.time}</p>
                  <p>Date: {task?.date}</p>
                </div>
                <img src={task?.photo} className="w-[80px] rounded-lg" alt="" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTask;
