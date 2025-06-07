import { createSlice } from "@reduxjs/toolkit";
import { sendMeContact } from "./operations";

interface ContactState {
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  status: "idle",
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMeContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(sendMeContact.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(sendMeContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send message.";
        state.status = "failed";
      });
  },
});

export const contactReduсer = contactSlice.reducer;
