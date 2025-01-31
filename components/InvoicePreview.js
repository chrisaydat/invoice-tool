// /components/InvoicePreview.js
import { useRef } from 'react';
import { generatePdf } from '../utils/generatePdf';

// A simple mapping for currency symbols
const currencySymbols = {
  USD: '$',
  GHS: 'GH₵'
};

export default function InvoicePreview({ logo, clientName, items, currency }) {
  const invoiceRef = useRef();

  // Calculate the total (for simplicity, the same numeric value is shown)
  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.amount || 0),
    0
  );

  // Build the mailto: URL. You can modify subject or body as needed.
  const mailtoLink = `mailto:?subject=Invoice for ${clientName}&body=Please%20find%20attached%20your%20invoice.`;

  return (
    <div className="space-y-8">
      {/* Invoice Preview Area */}
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
                <td className="py-2">
                  {currencySymbols[currency]}
                  {item.amount}
                </td>
              </tr>
            ))}
            <tr className="font-semibold text-xl">
              <td className="pt-4 border-t border-gray-300">Total</td>
              <td className="pt-4 border-t border-gray-300">
                {currencySymbols[currency]}{total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Footer with the built by text */}
        <p className="mt-4 italic text-sm text-gray-500 text-right">
          Built by aydat.org
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => generatePdf(invoiceRef.current)}
          className="py-3 px-6 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-colors"
        >
          Download PDF
        </button>
        <a
          href={mailtoLink}
          className="flex items-center space-x-2 py-3 px-6 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors"
        >
          {/* Simple email icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.94 6.34A2 2 0 014.81 5h10.38a2 2 0 011.87 1.34l-7.19 4.53-7.13-4.53z" />
            <path d="M18 8.16l-7.59 4.78a1 1 0 01-1.02 0L2 8.16V14a2 2 0 002 2h12a2 2 0 002-2V8.16z" />
          </svg>
          <span>Email Invoice</span>
        </a>
      </div>
    </div>
  );
}
