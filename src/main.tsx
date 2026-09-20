import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
// import { TrafficLight } from "./01-useState/TrafficLight";
// import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    <TrafficLightWithHook />
  </StrictMode>,
);
