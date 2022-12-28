import CompliteTask from "../../Components/CompliteTask/CompliteTask";
import Login from "../../Components/Login/Login";
import MyTask from "../../Components/MyTask/MyTask";
import Register from "../../Components/Register/Register";

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
    ],
  },
]);
