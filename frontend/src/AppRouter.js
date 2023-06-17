import { Route, Routes } from "react-router-dom";
import {
  Home,
  Account,
  ProfessionalProfile,
  ProfessionalsMarketplace,
  ScheduleAppointment,
  SignUp,
  LogIn,
  Appointments,
} from "./pages";
import { Navbar, ProtectedRoute } from "./components";

function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/login"} element={<LogIn />} />
        <Route exact path={"/signup"} element={<SignUp />} />
        <Route
          exact
          path={"/professionals"}
          element={<ProfessionalsMarketplace />}
        />
        <Route exact path={"/profile/:id"} element={<ProfessionalProfile />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path={"/account"} element={<Account />} />
          <Route
            exact
            path={"/schedule-appointment/:id"}
            element={<ScheduleAppointment />}
          />
          <Route exact path={"/appointments"} element={<Appointments />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
