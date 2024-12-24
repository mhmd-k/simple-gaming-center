import { useInvoices } from "../zustand/invoicesStore";
import { AgGridReact } from "ag-grid-react";
import { Period } from "../types";
import { useRef, useState } from "react";
import type { ColDef, INumberFilterParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeQuartz, colorSchemeDark } from "ag-grid-community";
import { formatTimeOfDay } from "../utils";
import type { CustomCellRendererProps } from "ag-grid-react";
import { BiDownload } from "react-icons/bi";
import { ExcelExportModule } from "ag-grid-enterprise";

const myTheme = themeQuartz.withPart(colorSchemeDark);
ModuleRegistry.registerModules([AllCommunityModule, ExcelExportModule]);

function Invoices() {
  const invoices = useInvoices((state) => state.invoices);

  const gridRef = useRef<AgGridReact<Period>>(null);

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

  const downloadExecl = () => gridRef.current!.api.exportDataAsExcel();

  return (
    <div
      style={{
        textAlign: "center",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      className="container"
    >
      <h1>Invoices</h1>
      {rowData.length > 0 && (
        <button onClick={downloadExecl} className="excel-download-btn">
          <BiDownload /> Excel Download
        </button>
      )}
      <div style={{ width: "100%", flex: 1 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          theme={myTheme}
          ref={gridRef}
        />
      </div>
    </div>
  );
}

export default Invoices;
