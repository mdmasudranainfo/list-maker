import AddTask from "../../Components/AddTask/AddTask";
import CompliteTask from "../../Components/CompliteTask/CompliteTask";
import Login from "../../Components/Login/Login";
import MyTask from "../../Components/MyTask/MyTask";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
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
        element: (
          <PrivateRoute>
            <MyTask></MyTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/mytask",
        element: (
          <PrivateRoute>
            <MyTask></MyTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/complitetask",
        element: (
          <PrivateRoute>
            <CompliteTask></CompliteTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/addtask",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/demo",
        element: <Demo></Demo>,
      },
      {
        path: "/update/:ids",
        element: (
          <PrivateRoute>
            <Update></Update>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://list-maker-server.vercel.app/task/${params.ids}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
