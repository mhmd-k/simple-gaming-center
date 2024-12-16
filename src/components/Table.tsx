import { Period } from "../types";
import { formatTimeToCounter } from "../utils";
import Counter from "./Counter";

interface TableProps extends Period {
  handleStart: (id: string) => void;
  handleStop: (id: string) => void;
  handleStartAgain: (id: string) => void;
}

function Table({
  id,
  table,
  handleStart,
  handleStop,
  handleStartAgain,
  start,
  end,
  price,
}: TableProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        borderBottom: "1px solid black",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div>Table {table}</div>

      {start && !end && <Counter start={start} />}

      {!start && (
        <div>
          <button onClick={() => handleStart(id)}>Start</button>
        </div>
      )}

      {start && !end && (
        <div>
          <button onClick={() => handleStop(id)}>Stop</button>
        </div>
      )}

      {price ? <span>{Math.round(price / 10) * 10} S.P</span> : null}

      {start && end && (
        <span>
          Time spent:{" "}
          {formatTimeToCounter(
            Math.round((end.getTime() - start.getTime()) / 1000)
          )}
        </span>
      )}

      {price ? (
        <button onClick={() => handleStartAgain(id)}>Start Again</button>
      ) : null}
    </div>
  );
}

export default Table;
