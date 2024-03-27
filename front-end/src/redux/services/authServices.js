import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosConfigs";

const authApiServices = {
  register: createAsyncThunk(
    "/auth/register",
    async (data, { rejectWithValue }) => {
      try {
        console.log(data);
        const response = await API.post("/auth/register", data);
        return response.data;
      } catch (error) {
        return rejectWithValue({
          error: error?.response?.data,
        });
      }
    }
  ),
  login: createAsyncThunk("/auth/login", async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await API.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error?.response?.data,
      });
    }
  }),
  updateProfile: createAsyncThunk(
    "/auth/updateProfile",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        console.log(data);
        const response = await API.put(`/auth/updateProfile/${id}`, data);
        return response.data;
      } catch (error) {
        return rejectWithValue({
          error: error?.response?.data,
        });
      }
    }
  ),
};

export default authApiServices;
