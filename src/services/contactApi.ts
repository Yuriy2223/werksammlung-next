// import { contactMeFormData } from "../App.type";
// import { Instance } from "./Api";

// export const sendMeContactApi = async (
//   data: contactMeFormData
// ): Promise<void> => {
//   await Instance.post("/api/contacts/me", data);
// };

import { contactMeFormData } from "@/types";
// import { publicInstance } from "./Api";
// import { privateInstance } from "./Api";
import axios from "axios";

const baseConfig = {
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const publicInstance = axios.create(baseConfig);

export const sendMeContactApi = async (
  data: contactMeFormData
): Promise<void> => {
  // await privateInstance.post("/api/contacts", data);
  await publicInstance.post("/api/contacts", data);
};
