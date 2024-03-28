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
        state.status = "success";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authApiServices.register.rejected, (state, action) => {
        state.status = "none";
        state.user = {};
        state.error = action?.payload?.error;
      })

      // login user
      .addCase(authApiServices.login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authApiServices.login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(authApiServices.login.rejected, (state, action) => {
        console.log("login slices registered ", action);
        state.status = "none";
        state.error = action?.payload?.error;
      })

      // get user profile data
      .addCase(authApiServices.getUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authApiServices.getUserInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(authApiServices.getUserInfo.rejected, (state, action) => {
        state.status = "none";
        state.error = action?.payload?.error;
      })

      // update the user
      .addCase(authApiServices.updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authApiServices.updateProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.user.successMessage = action?.payload?.data?.successMessage;
        state.user = action?.payload?.data?.user;
      })
      .addCase(authApiServices.updateProfile.rejected, (state, action) => {
        state.status = "none";
        state.error = action?.payload?.error;
      });
  },
});

export const { clearAllState } = userSlice.actions;
export default userSlice.reducer;
