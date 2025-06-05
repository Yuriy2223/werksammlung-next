import { RootState } from "../store";

export const selectContactLoading = (state: RootState) => state.contact.loading;

export const selectContactError = (state: RootState) => state.contact.error;

export const selectContactStatus = (state: RootState) => state.contact.status;
