import { Period } from "../types";
import { formatTimeFromDate } from "../utils";

function Invoice({ table, start, end, price }: Period) {
  return (
    <tr>
      <td>{table}</td>
      {start ? <td>{formatTimeFromDate(start)}</td> : <></>}
      {end ? <td>{formatTimeFromDate(end)}</td> : <></>}
      {price ? <td>{Math.round(price / 10) * 10} S.P</td> : <></>}
    </tr>
  );
}

export default Invoice;
