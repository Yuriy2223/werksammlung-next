import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./operations";
import { Profile } from "../../App.type";

export interface UserState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}
const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const profileReducer = profileSlice.reducer;
