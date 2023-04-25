import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  ProfessionalProfile,
  ProfessionalsMarketplace,
  ScheduleAppointment,
  Schedules,
  SignUp,
  LogIn,
} from "./pages";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/professionals",
    element: <ProfessionalsMarketplace />,
  },
  {
    path: "/profile/:id",
    element: <ProfessionalProfile />,
  },
  {
    path: "/schedule-appointment/:id",
    element: <ScheduleAppointment />,
  },
  {
    path: "/schedules",
    element: <Schedules />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

export default AppRouter;
