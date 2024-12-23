import { useInvoices } from "../zustand/invoicesStore";
import { AgGridReact } from "ag-grid-react";
import { Period } from "../types";
import { useState } from "react";
import type { ColDef, INumberFilterParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeQuartz, colorSchemeDark } from "ag-grid-community";
import { formatTimeOfDay } from "../utils";
import type { CustomCellRendererProps } from "ag-grid-react";

const myTheme = themeQuartz.withPart(colorSchemeDark);
ModuleRegistry.registerModules([AllCommunityModule]);

function Invoices() {
  const invoices = useInvoices((state) => state.invoices);

  const [rowData] = useState<Period[]>(invoices);

  const [colDefs] = useState<ColDef[]>([
    { field: "table", headerName: "Table" },
    {
      field: "start",
      headerName: "Start time",
      cellRenderer: (params: CustomCellRendererProps) =>
        formatTimeOfDay(params.value),
    },
    {
      field: "end",
      headerName: "End time",
      cellRenderer: (params: CustomCellRendererProps) =>
        formatTimeOfDay(params.value),
    },
    {
      field: "price",
      headerName: "Price",
      cellRenderer: (params: CustomCellRendererProps) => {
        // Format the price with commas for thousands
        const formattedPrice = new Intl.NumberFormat("en-US").format(
          params.value
        );

        return (
          <span>
            {formattedPrice} <span style={{ marginLeft: "4px" }}>SYP</span>
          </span>
        );
      },
      cellStyle: { color: "#4caf50", fontWeight: "bold" },
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      } as INumberFilterParams,
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div
      style={{
        textAlign: "center",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <h1>Invoices</h1>
      <div style={{ width: "100%", flex: 1 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          theme={myTheme}
        />
      </div>
    </div>
  );
}

export default Invoices;
