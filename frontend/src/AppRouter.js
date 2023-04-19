import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  ProfessionalProfile,
  ProfessionalsMarketplace,
  ScheduleAppointment,
  SignUp,
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
    path: "/signup",
    element: <SignUp />,
  },
]);

export default AppRouter;
