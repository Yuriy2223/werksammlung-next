"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "@/redux/auth/selectors";
import UserPage from "@/pages/UserPage/UserPage";

export default function User() {
  const isLoggedIn = useSelector(selectLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return <UserPage />;
}
