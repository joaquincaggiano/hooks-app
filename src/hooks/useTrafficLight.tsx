import { useEffect, useState } from "react";

export const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

export type TrafficLightColor = "red" | "yellow" | "green";

export const useTrafficLight = () => {
  const [light, setlight] = useState<TrafficLightColor>("red");
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    if (countDown === 0) return;

    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDown]);

  useEffect(() => {
    if (countDown > 0) return;

    if (light === "red") {
      setCountDown(5);
      setlight("green");
      return;
    }

    if (light === "green") {
      setCountDown(2);
      setlight("yellow");
      return;
    }

    if (light === "yellow") {
      setCountDown(5);
      setlight("red");
      return;
    }
  }, [countDown, light]);

  return {
    colors,
    countDown,
    light,
    percentage: (countDown / 5) * 100,
    greenLight: light === "green" ? colors.green : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
    redLight: light === "red" ? colors.red : "bg-gray-500",
  };
};
