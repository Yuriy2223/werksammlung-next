import { Profile } from "../../App.type";
import { RootState } from "../store";

export const selectProfile = (state: RootState): Profile | null =>
  state.profile.profile;

export const selectLoading = (state: RootState): boolean =>
  state.profile.loading;

export const selectError = (state: RootState): string | null =>
  state.profile.error;
