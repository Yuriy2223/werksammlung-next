// import { contactMeFormData } from "../App.type";
// import { Instance } from "./Api";

// export const sendMeContactApi = async (
//   data: contactMeFormData
// ): Promise<void> => {
//   await Instance.post("/api/contacts/me", data);
// };

import { contactMeFormData } from "../App.type";
import { privateInstance } from "./Api";

export const sendMeContactApi = async (
  data: contactMeFormData
): Promise<void> => {
  await privateInstance.post("/api/contacts/me", data);
};
