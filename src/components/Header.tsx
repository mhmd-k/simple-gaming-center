import { Link } from "react-router-dom";
import { formatDateToDMY } from "../utils";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Container, Stack } from "@mui/material";

function Header() {
  return (
    <header
      style={{
        boxShadow: "rgb(68 68 68) 0px 0px 3px 0px",
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link className="logo" to="/">
          <SportsEsportsIcon />
        </Link>
        <ul style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <li>
            <Link to="/invoices">
              <Stack flexDirection="row" gap={1} alignItems="center">
                <ReceiptIcon />
                Invoices
              </Stack>
            </Link>
          </li>
        </ul>
        <div className="date">{formatDateToDMY(new Date())}</div>
      </Container>
    </header>
  );
}

export default Header;
