import { useState, useEffect } from "react";

export const useGameTime = (initialTime: number = 480) => { // Start at 8:00 AM
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        return newTime >= 1440 ? 0 : newTime; // Reset at midnight
      });
    }, 1000); // 1 second = 1 minute in-game

    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const isSchoolHours = (minutes: number): boolean => {
    return minutes >= 480 && minutes < 900; // 8 AM - 3 PM
  };

  return {
    currentTime,
    setCurrentTime,
    formatTime,
    isSchoolHours,
    isPaused,
    setIsPaused
  };
};
