import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type TrafficLightColor = "red" | "yellow" | "green";

export const TrafficLightWithEffect = () => {
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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-2xl font-bold text-white">Traffic Light</h1>
        <h2 className="text-white text-xl">{countDown}</h2>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className={`${colors[light]} h-2 rounded-full transition-all duration-1000 ease-linear`}
            style={{ width: `${(countDown / 5) * 100}%` }}
          ></div>
        </div>

        <div
          className={`w-32 h-32 ${light === "red" ? colors.red : "bg-gray-500"} rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${light === "yellow" ? colors.yellow : "bg-gray-500"} rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${light === "green" ? colors.green : "bg-gray-500"} rounded-full`}
        ></div>
      </div>
    </div>
  );
};
