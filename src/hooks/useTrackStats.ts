// import axios from "axios";
// import { useEffect } from "react";
// import { publicInstance } from "../services/httpClient";

// export const useTrackStats = () => {
//   useEffect(() => {
//     const sessionKey = "user_ses_id";
//     const start = Date.now();

//     const sendStats = async (durationInSeconds: number) => {
//       if (!Number.isFinite(durationInSeconds) || durationInSeconds <= 0) {
//         return;
//       }

//       const sessionId = sessionStorage.getItem(sessionKey);

//       const postStats = async () => {
//         try {
//           const res = await publicInstance.post("/api/stats", {
//             timeSpent: durationInSeconds,
//           });

//           const newId = res.data?._id;
//           if (newId) {
//             sessionStorage.setItem(sessionKey, newId);
//           }
//         } catch (error) {
//           console.error("Не вдалося зберегти статистику", error);
//         }
//       };

//       try {
//         if (sessionId) {
//           await publicInstance.patch(`/api/stats/${sessionId}`, {
//             additionalTime: durationInSeconds,
//           });
//         } else {
//           await postStats();
//         }
//       } catch (err) {
//         if (
//           axios.isAxiosError(err) &&
//           (err.response?.status === 404 || err.response?.status === 400)
//         ) {
//           await postStats();
//         } else {
//           console.error("Помилка при оновленні статистики", err);
//         }
//       }
//     };

//     const handleUnload = () => {
//       const duration = Math.floor((Date.now() - start) / 1000);
//       sendStats(duration);
//     };

//     const handleVisibility = () => {
//       if (document.visibilityState === "hidden") {
//         handleUnload();
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibility);
//     window.addEventListener("pagehide", handleUnload);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibility);
//       window.removeEventListener("pagehide", handleUnload);
//     };
//   }, []);
// };

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
