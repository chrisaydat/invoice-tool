// /components/InvoicePreview.js
import { useRef, useState } from 'react';
import { generatePdf } from '../utils/generatePdf';
import { formatNumber, unformatNumber } from '../utils/formatNumber';

// A simple mapping for currency symbols
const currencySymbols = {
  USD: '$',
  GHS: 'GH₵'
};

export default function InvoicePreview({ logo, clientDetails, items, currency, senderDetails, invoiceDetails }) {
  const invoiceRef = useRef();
  const [emailLink, setEmailLink] = useState(null);

  // Calculate the total (for simplicity, the same numeric value is shown)
  const total = items.reduce(
    (acc, item) => acc + parseFloat(unformatNumber(item.amount || '0')),
    0
  );

  const handleEmailClick = async (e) => {
    e.preventDefault();
    try {
      const pdfDataUrl = await generatePdf(invoiceRef.current, true);
      
      // Create a more detailed email body
      const emailBody = `Dear ${clientDetails.name},

Please find attached the invoice ${invoiceDetails.invoiceNumber} for ${currencySymbols[currency]}${total.toFixed(2)}.

Payment Terms: ${invoiceDetails.paymentTerms}
Due Date: ${new Date(invoiceDetails.dueDate).toLocaleDateString()}

Best regards,
${senderDetails.name}`;

      // Create mailto link with attachment
      const mailtoLink = `mailto:${clientDetails.email || ''}?subject=Invoice ${invoiceDetails.invoiceNumber} from ${senderDetails.name}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Trigger PDF download separately since mailto can't handle attachments directly
      generatePdf(invoiceRef.current);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div ref={invoiceRef} className="bg-white rounded-2xl shadow p-8 text-black dark:text-black dark:bg-white invoice-content">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          {logo && (
            <img
              src={logo}
              alt="Logo"
              className="max-w-[150px] rounded-xl object-contain"
            />
          )}
          <div className="text-right">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">INVOICE</h1>
            <p className="text-gray-600 dark:text-gray-600">#{invoiceDetails.invoiceNumber}</p>
          </div>
        </div>

        {/* Sender and Client Details */}
        <div className="flex justify-between mb-8">
          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-800">From:</h3>
            <div className="text-gray-700 dark:text-gray-700">
              <p className="font-medium">{senderDetails.name}</p>
              <p>{senderDetails.address}</p>
              <p>{senderDetails.email}</p>
              <p>{senderDetails.phone}</p>
            </div>
          </div>
          <div className="w-1/2 text-right">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-800">To:</h3>
            <div className="text-gray-700 dark:text-gray-700">
              <p className="font-medium">{clientDetails.name}</p>
              <p>{clientDetails.address}</p>
              <p>{clientDetails.email}</p>
              <p>{clientDetails.phone}</p>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-gray-50 dark:bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-600">Issue Date</p>
              <p className="font-medium text-gray-800 dark:text-gray-800">{new Date(invoiceDetails.issueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-600">Due Date</p>
              <p className="font-medium text-gray-800 dark:text-gray-800">{new Date(invoiceDetails.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-600">Payment Terms</p>
              <p className="font-medium text-gray-800 dark:text-gray-800">{invoiceDetails.paymentTerms}</p>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-gray-800 dark:text-gray-800">Description</th>
                <th className="text-right py-2 text-gray-800 dark:text-gray-800">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 text-gray-800 dark:text-gray-800">{item.description}</td>
                  <td className="text-right py-2 text-gray-800 dark:text-gray-800">
                    {currencySymbols[currency]}{formatNumber(parseFloat(unformatNumber(item.amount || '0')).toFixed(2))}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-4 text-gray-800 dark:text-gray-800">Total</td>
                <td className="text-right py-4 text-gray-800 dark:text-gray-800">
                  {currencySymbols[currency]}{formatNumber(total.toFixed(2))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 dark:text-gray-500 text-sm mt-12">
          <p>Generated by Aydat.org</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => generatePdf(invoiceRef.current)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
        <button
          onClick={handleEmailClick}
          className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-colors"
        >
          Send via Email
        </button>
      </div>
    </div>
  );
}
