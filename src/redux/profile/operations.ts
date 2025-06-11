import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "@/types";
import { fetchProfileApi } from "../../services/profileApi";

export const fetchProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>("/profiles", async (_, { rejectWithValue }) => {
  try {
    return await fetchProfileApi();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch user data."
    );
  }
});
