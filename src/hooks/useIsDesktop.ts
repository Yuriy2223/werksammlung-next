import { useEffect, useState } from "react";

export const useIsDesktop = (breakpoint = 1024) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const update = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isDesktop;
};
