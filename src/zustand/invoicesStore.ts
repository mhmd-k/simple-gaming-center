import { create } from "zustand";
import { Period } from "../types";

interface InvoiceStore {
  invoices: Period[];
  setInvoices: (invoices: Period[]) => void;
}

const useInvoices = create<InvoiceStore>((set) => ({
  invoices: [],
  setInvoices: (invoices) => set({ invoices }),
}));

export { useInvoices };
