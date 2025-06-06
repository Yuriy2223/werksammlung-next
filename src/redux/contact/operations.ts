import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactMeFormData } from "@/types";
import { sendMeContactApi } from "../../services/contactApi";
import { isAxiosError } from "axios";

export const sendMeContact = createAsyncThunk<
  void,
  contactMeFormData,
  { rejectValue: string }
>("contact/sendMeContact", async (data, { rejectWithValue }) => {
  try {
    await sendMeContactApi(data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const res = error.response?.data;
      const message =
        typeof res === "string"
          ? res
          : res?.message || "Sending message failed.";
      return rejectWithValue(message);
    }

    return rejectWithValue("Sending message failed.");
  }
});
