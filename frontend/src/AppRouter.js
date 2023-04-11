import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  ProfessionalProfile,
  ProfessionalsMarketplace,
  Agendamento,
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
    path: "/profile",
    element: <ProfessionalProfile />,
  },
  {
    path: "/agendamento",
    element: <Agendamento />,
  },
]);

export default AppRouter;
