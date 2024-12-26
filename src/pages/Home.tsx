import { v4 as uuidv4 } from "uuid";
import { getSecondsBetweenDates } from "../utils";
import GamingTable from "../components/GamingTable";
import { useInvoices } from "../zustand/invoicesStore";
import { useTablesStore } from "../zustand/tablesStore";
import { Box, Container, Button, Alert } from "@mui/material";
import { SportsSoccer } from "@mui/icons-material";
import { useEffect, useState } from "react";

const SECOND_PRICE = 2.8;

function Home() {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isAlertOpen) {
      setTimeout(() => setIsAlertOpen(false), 5000);
    }
  }, [isAlertOpen]);

  const tables = useTablesStore((state) => state.tables);
  const setTables = useTablesStore((state) => state.setTables);

  const invoices = useInvoices((state) => state.invoices);
  const setInvoices = useInvoices((state) => state.setInvoices);

  const handleStart = (id: string) => {
    const start = new Date();
    const tableNumber = tables.find((e) => e.id === id)?.table;
    localStorage.setItem(`table-${tableNumber}`, start.toString());
    setTables(tables.map((e) => (e.id === id ? { ...e, start: start } : e)));
  };

  const handleStop = (id: string) => {
    const tableNumber = tables.find((e) => e.id === id)?.table;
    localStorage.removeItem(`table-${tableNumber}`);

    const endDate = new Date();

    let newPeriod = tables.find((e) => e.id === id);

    if (!newPeriod) return;

    const seconds = getSecondsBetweenDates(
      newPeriod.start || new Date(),
      endDate
    );

    newPeriod = {
      ...newPeriod,
      end: endDate,
      price: Math.round((seconds * SECOND_PRICE) / 500) * 500,
    };

    if (Math.round((seconds * SECOND_PRICE) / 500) * 500 === 0) {
      setTables(
        tables.map((e) =>
          e.id === id ? { ...e, start: null, end: null, price: 0 } : e
        )
      );
      return;
    }

    setInvoices([...invoices, newPeriod]);

    setTables(tables.map((e) => (e.id === id ? newPeriod : e)));
  };

  const handleStartAgain = (id: string) => {
    const start = new Date();

    const tableNumber = tables.find((e) => e.id === id)?.table;
    localStorage.setItem(`table-${tableNumber}`, start.toString());

    setTables(
      tables.map((e) =>
        e.id === id
          ? { ...e, id: uuidv4(), start: start, end: null, price: 0 }
          : e
      )
    );
  };

  const addOneGame = () => {
    const d = new Date();

    setInvoices([
      ...invoices,
      {
        id: uuidv4(),
        table: 1,
        start: d,
        end: new Date(d.getTime() + 15 * 60000),
        price: 3000,
      },
    ]);

    setIsAlertOpen(!isAlertOpen);
  };

  return (
    <>
      {isAlertOpen && (
        <Alert
          color="success"
          variant="filled"
          sx={{
            width: "450px",
            maxWidth: "100%",
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            top: "100px",
          }}
          onClose={() => setIsAlertOpen(!isAlertOpen)}
          hidden={isAlertOpen}
        >
          One PES game has been added
        </Alert>
      )}
      <Container
        sx={{
          minHeight: "90dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          width="100%"
          maxWidth="600px"
          border="1px solid white"
          display="flex"
          marginBottom={5}
        >
          {tables.map((table) => (
            <GamingTable
              key={table.id}
              {...table}
              handleStart={handleStart}
              handleStop={handleStop}
              handleStartAgain={handleStartAgain}
            />
          ))}
        </Box>
        <Box>
          <Button variant="contained" color="success" onClick={addOneGame}>
            Add one PES game <SportsSoccer />
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Home;
