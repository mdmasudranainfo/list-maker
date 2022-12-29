import React from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const Task = useLoaderData();

  const updateHandler = (event) => {
    event.preventDefault();
    const from = event.target;
    const title = from.title.value;
    const taskDis = from.taskDis.value;

    const info = {
      title,
      taskDis,
    };

    fetch(`http://localhost:5000/update/${Task._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Updated successfully");

        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-9">
      <div className=" lg:w-6/12 lg:mx-auto gap-4 justify-center items-center text-center">
        <form
          onSubmit={updateHandler}
          className="bg-base-100 shadow-xl rounded my-4 w-12/6 p-4"
        >
          <h2 className="text-sm md:text-2xl  mb-2 font-bold text-violet-700 ">
            Update Task
          </h2>

          {/* <p className="mb-3"> Date.</p> */}
          <input
            type="text"
            defaultValue={Task?.title}
            className="w-full rounded my-2 focus:outline-violet-500 border p-2"
            placeholder="Type  Task Title"
            name="title"
            required
          />
          <br />
          <textarea
            name="taskDis"
            defaultValue={Task?.taskDis}
            id=""
            cols="40"
            className="w-full lg:w-full focus:outline-violet-500 border p-2"
            rows="2"
            placeholder="Type Your Task"
          ></textarea>
          <br />
          <input
            type="file"
            name="image"
            id=""
            placeholder="Upload Your Image"
            className="my-4 border rounded w-full md:w-full p-3 "
          />
          <br />

          <input
            type="submit"
            className="btn border  hover:bg-green-400 duration-500 hover:duration-300 p-3 rounded"
            value="Submit your Task"
          />
        </form>
      </div>
    </div>
  );
};

export default Update;
