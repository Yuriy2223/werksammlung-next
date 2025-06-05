import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../App.type";
import { fetchProfileApi } from "../../services/profileApi";

export const fetchProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>("/profile", async (_, { rejectWithValue }) => {
  try {
    return await fetchProfileApi();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch user data."
    );
  }
});
