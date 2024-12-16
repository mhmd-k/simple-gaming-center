import { Link } from "react-router-dom";
import { formatDateToDMY } from "../utils";
import { IoMdPaper } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { SlScreenDesktop } from "react-icons/sl";

function Header() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Link className="logo" to="/">
        <IoGameController />
      </Link>
      <ul style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <li>
          <Link to="/">
            <SlScreenDesktop /> Tables
          </Link>
        </li>
        <li>
          <Link to="/invoices">
            <IoMdPaper /> Invoices
          </Link>
        </li>
      </ul>
      <div className="date">{formatDateToDMY(new Date())}</div>
    </div>
  );
}

export default Header;
