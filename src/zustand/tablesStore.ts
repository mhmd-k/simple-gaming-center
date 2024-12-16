import { create } from "zustand";
import { Period } from "../types";
import { v4 as uuidv4 } from "uuid";

const initialTables: Period[] = [
  {
    table: 1,
    id: uuidv4(),
    start: null,
    end: null,
    price: 0,
  },
  {
    table: 2,
    id: uuidv4(),
    start: null,
    end: null,
    price: 0,
  },
  {
    table: 3,
    id: uuidv4(),
    start: null,
    end: null,
    price: 0,
  },
];

interface TablesStore {
  tables: Period[];
  setTables: (invoices: Period[]) => void;
  addTable: (tableNumber: number) => void;
}

const useTablesStore = create<TablesStore>((set) => ({
  tables: initialTables,
  setTables: (tables) => set({ tables }),
  addTable: (tableNumber) =>
    set((state) => ({
      tables: [
        ...state.tables,
        {
          ...initialTables[0],
          id: uuidv4(),
          tableNumber: tableNumber,
        },
      ],
    })),
}));

export { useTablesStore };
