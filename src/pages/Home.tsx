import { v4 as uuidv4 } from "uuid";
import { getSecondsBetweenDates } from "../utils";
import Table from "../components/Table";
import { useInvoices } from "../zustand/invoicesStore";
import { useTablesStore } from "../zustand/tablesStore";

const SECOND_PRICE = 2.8;

function Home() {
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

  return (
    <div className="container">
      {tables.map((table) => (
        <Table
          key={table.id}
          {...table}
          handleStart={handleStart}
          handleStop={handleStop}
          handleStartAgain={handleStartAgain}
        />
      ))}
    </div>
  );
}

export default Home;
