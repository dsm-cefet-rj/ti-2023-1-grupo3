import { configureStore } from "@reduxjs/toolkit";
import {
  appointmentSlice as appointmentReducer,
  locationSlice as locationReducer,
  professionalSlice as professionalReducer,
  userSlice as userReducer,
} from "./slices";

export default configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    professional: professionalReducer,
    appointment: appointmentReducer,
  },
});
