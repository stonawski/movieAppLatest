import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    console.log("Sending request with user credentials:", userCredentials);
    try {
      const req = await axios.post(
        "http://localhost:3001/api/login",
        userCredentials
      );
      const response = await req.data;
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      // Check if the error status is 401
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const selectError = createSelector(
  (state) => state.user.error,
  (error) => error
);

export default userSlice.reducer;
