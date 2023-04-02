import { createBrowserRouter } from "react-router-dom";
import { Home, ProfessionalsMarketplace } from "./pages";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/professionals",
    element: <ProfessionalsMarketplace />,
  },
]);

export default AppRouter;
