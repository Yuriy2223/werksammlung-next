import { useEffect } from "react";
import { publicInstance } from "../services/httpClient";

export const useTrackStats = () => {
  useEffect(() => {
    const sessionKey = "user_ses_id";
    const start = Date.now();

    const sendPatch = async (durationInSeconds: number, sessionId: string) => {
      if (!Number.isFinite(durationInSeconds) || durationInSeconds <= 0) return;

      try {
        await publicInstance.patch(`/api/stats?id=${sessionId}`, {
          additionalTime: durationInSeconds,
        });
      } catch (err) {
        console.error("Помилка оновлення статистики", err);
      }
    };

    const sendPost = (durationInSeconds: number) => {
      if (!Number.isFinite(durationInSeconds) || durationInSeconds <= 0) return;

      const body = JSON.stringify({ timeSpent: durationInSeconds });
      navigator.sendBeacon(
        "/api/stats",
        new Blob([body], { type: "application/json" })
      );
    };

    const handleUnload = () => {
      const duration = Math.floor((Date.now() - start) / 1000);
      const sessionId = sessionStorage.getItem(sessionKey);

      if (sessionId) {
        const body = JSON.stringify({ additionalTime: duration });
        navigator.sendBeacon(
          `/api/stats?id=${sessionId}`,
          new Blob([body], { type: "application/json" })
        );
      } else {
        sendPost(duration);
      }
    };

    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - start) / 1000);
      const sessionId = sessionStorage.getItem(sessionKey);
      if (sessionId) {
        sendPatch(duration, sessionId);
      }
    }, 60000);

    window.addEventListener("pagehide", handleUnload);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handleUnload();
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("pagehide", handleUnload);
      document.removeEventListener("visibilitychange", handleUnload);
    };
  }, []);
};
