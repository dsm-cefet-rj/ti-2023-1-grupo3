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
import { Navbar } from "./components";

function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/account/:id"} element={<Account />} />
        <Route
          exact
          path={"/professionals"}
          element={<ProfessionalsMarketplace />}
        />
        <Route exact path={"/profile/:id"} element={<ProfessionalProfile />} />
        <Route
          exact
          path={"/schedule-appointment/:id"}
          element={<ScheduleAppointment />}
        />
        <Route exact path={"/appointments"} element={<Appointments />} />
        <Route exact path={"/signup"} element={<SignUp />} />
        <Route exact path={"/login"} element={<LogIn />} />
      </Routes>
    </>
  );
}

export default AppRouter;
