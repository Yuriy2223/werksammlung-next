// import { Profile } from "../App.type";
// import { Instance } from "./Api";

// export const fetchProfileApi = async (): Promise<Profile> => {
//   const response = await Instance.get<Profile>("/api/profile");
//   return response.data;
// };

import { Profile } from "@/types";
import { publicInstance } from "./httpClient";

export const fetchProfileApi = async (): Promise<Profile> => {
  const response = await publicInstance.get<Profile>("/api/profiles");
  return response.data;
};
