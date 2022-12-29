import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Tools/ContentApi/UserContext";

const AddTask = () => {
  //
  const { user } = useContext(AuthContext);

  // time and date
  const time = new Date().toLocaleTimeString();

  const date = new Date().toLocaleDateString();

  // console.log(date);

  //
  const addHandler = (event) => {
    event.preventDefault();
    const from = event.target;
    const title = from.title.value;
    const taskDis = from.taskDis.value;
    const image = from.image.files[0];

    //
    let formData = new FormData();
    formData.append("image", image);
    console.log(formData);

    //

    //

    // send imagebb
    const url =
      "https://api.imgbb.com/1/upload?key=fd31eb1b7eccf01a95d0b1949fe0e46a";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.display_url);
        const photo = data.data.display_url;
        if (photo) {
          sendDatabase(title, taskDis, photo);
          from.reset();
          return;
        }

        // database fn
        sendDatabase(title, taskDis, photo);
      })
      .catch((err) => {
        sendDatabase(title, taskDis);
        from.reset();
      });

    //
  };

  //   database fetch request
  const sendDatabase = (title, taskDis, photo) => {
    const taskInfo = {
      title,
      taskDis,
      photo,
      time,
      date,
      email: user.email,
      complite: false,
    };

    fetch("http://localhost:5000/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Added successfully Task");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-9">
      <div className=" lg:w-6/12 lg:mx-auto gap-4 justify-center items-center text-center">
        <form
          onSubmit={addHandler}
          className="bg-base-100 shadow-xl rounded my-4 w-12/6 p-4"
        >
          <h2 className="text-sm md:text-2xl  mb-2 font-bold text-violet-700 ">
            Add Your Task
          </h2>

          <p className="mb-3"> Date.</p>
          <input
            type="text"
            className="w-full rounded my-2 focus:outline-violet-500 border p-2"
            placeholder="Type  Task Title"
            name="title"
            required
          />
          <br />
          <textarea
            name="taskDis"
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

export default AddTask;
