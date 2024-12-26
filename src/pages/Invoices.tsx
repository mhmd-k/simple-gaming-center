import { useInvoices } from "../zustand/invoicesStore";
import { AgGridReact } from "ag-grid-react";
import { Period } from "../types";
import { useRef, useState } from "react";
import type {
  ColDef,
  INumberFilterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeQuartz, colorSchemeDark } from "ag-grid-community";
import { formatTimeOfDay } from "../utils";
import type { CustomCellRendererProps } from "ag-grid-react";
import DownloadIcon from "@mui/icons-material/Download";
import { ExcelExportModule } from "ag-grid-enterprise";
import { Button, Container, Stack, Typography } from "@mui/material";

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
      valueFormatter: (params: ValueFormatterParams) =>
        formatTimeOfDay(params.value),
    },
    {
      field: "end",
      headerName: "End time",
      valueFormatter: (params: ValueFormatterParams) =>
        formatTimeOfDay(params.value),
    },
    {
      field: "price",
      headerName: "Price",
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <span>
            {params.value} <span style={{ marginLeft: "4px" }}>SYP</span>
          </span>
        );
      },
      valueFormatter: (params: ValueFormatterParams) => {
        const formattedPrice = new Intl.NumberFormat("en-US").format(
          params.value
        );
        return formattedPrice;
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
    <Container>
      <Stack
        gap={4}
        justifyContent="center"
        alignItems="center"
        minHeight="90dvh"
      >
        <Typography component="h1" fontSize={50} textAlign="center">
          Invoices
        </Typography>
        {rowData.length > 0 && (
          <Button onClick={downloadExecl} variant="contained" color="success">
            <DownloadIcon /> Excel Download
          </Button>
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
      </Stack>
    </Container>
  );
}

export default Invoices;
