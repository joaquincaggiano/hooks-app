import { useTrafficLight } from "../hooks/useTrafficLight";

export const TrafficLightWithHook = () => {
  const {
    colors,
    countDown,
    light,
    percentage,
    greenLight,
    yellowLight,
    redLight,
  } = useTrafficLight();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-2xl font-bold text-white">Traffic Light</h1>
        <h2 className="text-white text-xl">{countDown}</h2>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className={`${colors[light]} h-2 rounded-full transition-all duration-1000 ease-linear`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className={`w-32 h-32 ${redLight} rounded-full`}></div>

        <div className={`w-32 h-32 ${yellowLight} rounded-full`}></div>

        <div className={`w-32 h-32 ${greenLight} rounded-full`}></div>
      </div>
    </div>
  );
};
