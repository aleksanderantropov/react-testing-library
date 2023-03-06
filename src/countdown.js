import { useEffect, useState } from 'react';

export const Countdown = ({ time }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!remainingTime) {
        clearInterval(intervalId);
      } else {
        setRemainingTime((t) => t - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return remainingTime;
};
