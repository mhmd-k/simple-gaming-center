import { useInvoices } from "../zustand/invoicesStore";
import Invoice from "../components/Invoice";

function Invoices() {
  const invoices = useInvoices((state) => state.invoices);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Invoices</h1>
      {invoices.length === 0 ? (
        <h2>No Invoices Availabe</h2>
      ) : (
        <table style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Table num.</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Paid amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((e) => (
              <Invoice key={e.id} {...e} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Invoices;
