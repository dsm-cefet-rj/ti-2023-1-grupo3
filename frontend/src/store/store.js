import { configureStore } from "@reduxjs/toolkit";
import {
  professionalSlice as professionalReducer,
  userSlice as userReducer,
} from "./slices";

export default configureStore({
  reducer: {
    user: userReducer,
    professional: professionalReducer,
  },
});
