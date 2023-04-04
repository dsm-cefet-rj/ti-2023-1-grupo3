import { createBrowserRouter } from "react-router-dom";
import { Home, ProfessionalProfile, ProfessionalsMarketplace } from "./pages";

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
]);

export default AppRouter;
