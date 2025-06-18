"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { selectProfile, selectLoading } from "@/redux/profile/selectors";
import { fetchProfile } from "@/redux/profile/operations";
import { Loader } from "../Loader/Loader";

export function AppGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (!profile && !loading) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile, loading]);

  if (loading || !profile) {
    return <Loader />;
  }

  return <>{children}</>;
}
