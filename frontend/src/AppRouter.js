import { createBrowserRouter } from "react-router-dom";
import { Home, ProfessionalsMarketplace, } from "./pages";
import Agendamento from "./pages/Agendamento";

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
  path: "/agendamento",
  element: <Agendamento />,
  }
]);

export default AppRouter;
