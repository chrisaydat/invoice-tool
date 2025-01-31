// /components/InvoicePreview.js
import { useRef } from 'react';
import { generatePdf } from '../utils/generatePdf';

export default function InvoicePreview({ logo, clientName, items }) {
  const invoiceRef = useRef();

  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.amount || 0),
    0
  );

  return (
    <div className="space-y-8">
      <div ref={invoiceRef} className="bg-white rounded-2xl shadow p-8">
        {logo && (
          <img
            src={logo}
            alt="Logo"
            className="max-w-[150px] mb-6 rounded-xl object-contain"
          />
        )}
        <h2 className="text-3xl font-light mb-4">Invoice for {clientName}</h2>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left">
              <th className="pb-2 border-b border-gray-300">Description</th>
              <th className="pb-2 border-b border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="text-lg">
                <td className="py-2">{item.description}</td>
                <td className="py-2">${item.amount}</td>
              </tr>
            ))}
            <tr className="font-semibold text-xl">
              <td className="pt-4 border-t border-gray-300">Total</td>
              <td className="pt-4 border-t border-gray-300">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={() => generatePdf(invoiceRef.current)}
        className="w-full py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-colors"
      >
        Download PDF
      </button>
    </div>
  );
}
