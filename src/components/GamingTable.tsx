import { Button } from "@mui/material";
import { Period } from "../types";
import { formatTime } from "../utils";
import Counter from "./Counter";

interface TableProps extends Period {
  handleStart: (id: string) => void;
  handleStop: (id: string) => void;
  handleStartAgain: (id: string) => void;
}

function GamingTable({
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
        flexDirection: "column",
        gap: "20px",
        borderRight: "1px solid white",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        width: "100%",
      }}
    >
      <div>Table {table}</div>

      {start && !end && <Counter start={start} table={table} />}

      {!start && (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleStart(id)}
          >
            Start
          </Button>
        </div>
      )}

      {start && !end && (
        <div>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleStop(id)}
          >
            Stop
          </Button>
        </div>
      )}

      {price ? (
        <span style={{ fontWeight: "800" }}>
          {" "}
          {Math.round(price / 10) * 10} S.P
        </span>
      ) : null}

      {start && end && (
        <span>
          Time spent:{" "}
          {formatTime(Math.round((end.getTime() - start.getTime()) / 1000))}
        </span>
      )}

      {price ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleStartAgain(id)}
        >
          Start Again
        </Button>
      ) : null}
    </div>
  );
}

export default GamingTable;
