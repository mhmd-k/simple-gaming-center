import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Invoices from "./pages/Invoices";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import { formatDateToDMY } from "./utils";
import { Period } from "./types";
import { useInvoices } from "./zustand/invoicesStore";
import animationData from "./lotties/controller-lottie.json";
import Lottie from "react-lottie";
import { useTablesStore } from "./zustand/tablesStore";

function App() {
  const setInvoces = useInvoices((state) => state.setInvoices);
  const invoices = useInvoices((state) => state.invoices);

  const tables = useTablesStore((state) => state.tables);
  const setTables = useTablesStore((state) => state.setTables);

  const [loading, setLoading] = useState(true);

  console.log(tables);

  useEffect(() => {
    setTables(
      tables.map((e) => {
        const start = localStorage.getItem(`table-${e.table}`);
        if (start) {
          return {
            ...e,
            start: new Date(start),
          };
        }
        return e;
      })
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const today = formatDateToDMY(new Date());

    const periods = localStorage.getItem(today);

    if (periods) {
      setInvoces(
        periods
          ? (JSON.parse(periods) as Period[]).map((e) => ({
              ...e,
              start: e.start ? new Date(e.start) : null,
              end: e.end ? new Date(e.end) : null,
            }))
          : []
      );
    }
  }, []);

  useEffect(() => {
    if (invoices.length > 0)
      localStorage.setItem(
        formatDateToDMY(new Date()),
        JSON.stringify(invoices)
      );
  }, [invoices]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { element: <Home />, index: true },
        { path: "/invoices", element: <Invoices /> },
      ],
    },
  ]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {loading ? (
        <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
