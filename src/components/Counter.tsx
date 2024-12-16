import { useEffect, useState } from "react";
import { formatTimeToCounter } from "../utils";

function Counter({ start }: { start: Date }) {
  const [time, setTime] = useState<number>(
    Math.floor((new Date().getTime() - start.getTime()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return <div>{formatTimeToCounter(time)}</div>;
}

export default Counter;
