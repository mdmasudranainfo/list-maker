import AddTask from "../../Components/AddTask/AddTask";
import CompliteTask from "../../Components/CompliteTask/CompliteTask";
import Login from "../../Components/Login/Login";
import MyTask from "../../Components/MyTask/MyTask";
import Register from "../../Components/Register/Register";
import Update from "../../Components/Update/Update";
import Demo from "../Demo/Demo";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Components/Layout/Main");

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/mytask",
        element: <MyTask></MyTask>,
      },
      {
        path: "/complitetask",
        element: <CompliteTask></CompliteTask>,
      },
      {
        path: "/addtask",
        element: <AddTask></AddTask>,
      },
      {
        path: "/demo",
        element: <Demo></Demo>,
      },
      {
        path: "/update/:ids",
        element: <Update></Update>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/task/${params.ids}`),
      },
    ],
  },
]);
