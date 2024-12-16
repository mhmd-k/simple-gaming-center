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
    setTables(
      tables.map((e) => (e.id === id ? { ...e, start: new Date() } : e))
    );
  };

  const handleStop = (id: string) => {
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
    setTables(
      tables.map((e) =>
        e.id === id
          ? { ...e, id: uuidv4(), start: new Date(), end: null, price: 0 }
          : e
      )
    );
  };

  return (
    <div>
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
