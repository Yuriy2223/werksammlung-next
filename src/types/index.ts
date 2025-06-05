export type Language = "EN" | "DE" | "UA";
export type Languages = "en" | "de" | "ua";

export interface User {
  id: string;
  name: string;
  email: string;
}
export interface Profile {
  _id: string;
  firstName: LangText;
  lastName: LangText;

  avatarUrl: string;
  viewCV: string;
  about: LangText;

  email: string;
  linkedin: string;
  telegram: string;
  gitHub: string;

  skills: Category[];
  projects: Project[];
}
export interface Project {
  _id: string;
  imgUrl: string;
  title: LangText;
  technologies: string[];

  description: LangText;
  codeUrl: string;
  webUrl: string;
  role: LangText;
  date: string;

  createdAt: string;
  updatedAt: string;
}
export interface Category {
  _id: string;
  category: LangText;
  items: Skill[];
}
export interface Skill {
  _id: string;
  name: LangText;
  link: string;
}
export interface LangText {
  en: string;
  ua: string;
  de: string;
}
export interface contactMeFormData {
  name: string;
  email: string;
  message: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface ResetPasswordData {
  token: string;
  password: string;
}
export interface RequestResetData {
  email: string;
}
