import { Profile } from "@/types";
import { publicInstance } from "./httpClient";

export const fetchProfileApi = async (): Promise<Profile> => {
  const response = await publicInstance.get<Profile>("/api/profiles");
  return response.data;
};
