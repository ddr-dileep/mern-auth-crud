import { createSlice } from "@reduxjs/toolkit";
import locationApiServices from "../services/locationServices";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  nearestUsers: {},
  extraReducers(builder) {
    builder
      .addCase(locationApiServices.nearByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(locationApiServices.nearByUser.fulfilled, (state, action) => {
        state.status = "success";
        state.nearestUsers = action?.payload;
      })
      .addCase(locationApiServices.nearByUser.rejected, (state, action) => {
        state.status = "none";
        state.error = action?.payload?.error;
        state.nearUsers = {};
      });
  },
});

export default userSlice.reducer;
