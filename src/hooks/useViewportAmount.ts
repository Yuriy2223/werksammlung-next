import { useState, useEffect } from "react";

export const useViewportAmount = (): number => {
  const [amount, setAmount] = useState(0.5);

  useEffect(() => {
    const updateAmount = () => {
      const width = window.innerWidth;

      if (width <= 375) {
        setAmount(0.1);
      } else if (width <= 768) {
        setAmount(0.3);
      } else {
        setAmount(0.5);
      }
    };

    updateAmount();
    window.addEventListener("resize", updateAmount);
    return () => window.removeEventListener("resize", updateAmount);
  }, []);

  return amount;
};
