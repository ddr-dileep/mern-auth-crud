import { createSlice } from "@reduxjs/toolkit";
import authApiServices from "../services/authServices";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    clearAllState: () => ({}),
  },
  user: {},
  extraReducers(builder) {
    builder
      // register the user
      .addCase(authApiServices.register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authApiServices.register.fulfilled, (state, action) => {
        console.log("register slices registered ", state, action);
        state.status = "success";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authApiServices.register.rejected, (state, action) => {
        console.log("register slices registered ", action);
        state.status = "none";
        state.user = {};
        state.error = action?.payload?.error;
      })

      // login user
      .addCase(authApiServices.login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authApiServices.login.fulfilled, (state, action) => {
        console.log("login slices registered ", state, action);
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(authApiServices.login.rejected, (state, action) => {
        console.log("login slices registered ", action);
        state.status = "none";
        state.error = action?.payload?.error;
      })

      // update the user
      .addCase(authApiServices.updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authApiServices.updateProfile.fulfilled, (state, action) => {
        console.log("update slices registered ", state, action);
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(authApiServices.updateProfile.rejected, (state, action) => {
        console.log("update slices registered ", action);
        state.status = "none";
        state.error = action?.payload?.error;
      });
  },
});

export const { clearAllState } = userSlice.actions;
export default userSlice.reducer;
