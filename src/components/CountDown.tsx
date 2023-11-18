import React, { useState, useEffect } from 'react';

interface CountDownProps {
  initialTimeInSeconds: number;
  name: string;
  countdownStyles?: React.CSSProperties; // Optional style prop
}

const CountDown: React.FC<CountDownProps> = ({
  initialTimeInSeconds,
  name,
  countdownStyles = {},
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTimeInSeconds);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', ...countdownStyles }}>
      <h1>{name}</h1>
      <p>Time Remaining: {formatTime(timeRemaining)}</p>
    </div>
  );
};

export default CountDown;
