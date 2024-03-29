import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosConfigs";

const locationApiServices = {
  nearByUser: createAsyncThunk(
    "/location/near-by",
    async (data, { rejectWithValue }) => {
      try {
        const response = await API.get("/location/near-by", data);
        return response.data;
      } catch (error) {
        return rejectWithValue({
          error: error?.response,
        });
      }
    }
  ),
};

export default locationApiServices;
