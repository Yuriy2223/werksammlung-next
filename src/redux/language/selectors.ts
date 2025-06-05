import { RootState } from "../store";

export const selectLanguage = (state: RootState) =>
  state.language.currentLanguage;
