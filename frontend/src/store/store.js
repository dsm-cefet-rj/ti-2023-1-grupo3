import { configureStore } from "@reduxjs/toolkit";
import {
  appointmentSlice as appointmentReducer,
  professionalSlice as professionalReducer,
  userSlice as userReducer,
} from "./slices";

export default configureStore({
  reducer: {
    user: userReducer,
    professional: professionalReducer,
    appointment: appointmentReducer,
  },
});
