import { useCounter } from "@/hooks/useCounter";
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number) => {
  console.time("Heavy_Stuff");

  for (let i = 0; i < iterationNumber; i++) {
    console.log("Here we go...");
  }

  console.timeEnd("Heavy_Stuff");

  return `${iterationNumber} iteraciones realizadas`;
};

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40000);
  const { counter: counter2, increment: increment2 } = useCounter(40000);

  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">
        Memo - useMemo - {myHeavyValue}
      </h1>
      <hr />

      <h4>Counter {counter}</h4>
      <h4>Counter {counter2}</h4>

      <button
        onClick={increment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        +1
      </button>

      <button
        onClick={increment2}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        +1 Counter 2
      </button>
    </div>
  );
};
