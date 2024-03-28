import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosConfigs";

const authApiServices = {
  register: createAsyncThunk(
    "/auth/register",
    async (data, { rejectWithValue }) => {
      try {
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
      const response = await API.post("/auth/login", data);
      localStorage.setItem("auth", response?.data?.data?.token);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error?.response?.data,
      });
    }
  }),
  getUserInfo: createAsyncThunk("/auth/user-info", async (rejectWithValue) => {
    try {
      const response = await API.get("/auth/user-info");
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue({
        error: error?.response?.data,
      });
    }
  }),
  updateProfile: createAsyncThunk(
    "/auth/update",
    async (data, { rejectWithValue }) => {
      try {
        const response = await API.put("/auth/update", data);
        return response?.data;
      } catch (error) {
        return rejectWithValue({
          error: error?.response?.data,
        });
      }
    }
  ),
};

export default authApiServices;
