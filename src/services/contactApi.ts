import { contactMeFormData } from "@/types";
import { publicInstance } from "./httpClient";

export const sendMeContactApi = async (
  data: contactMeFormData
): Promise<void> => {
  await publicInstance.post("/api/contacts", data);
};
