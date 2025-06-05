"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "@/redux/auth/selectors";
import UserPage from "@/pages/UserPage/UserPage";

export default function User() {
  const isLoggedIn = useSelector(selectLoggedIn); // твій selector з redux
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // редірект на головну, якщо не залогінений
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // можна вставити <Loader /> або просто нічого

  return <UserPage />;
}
