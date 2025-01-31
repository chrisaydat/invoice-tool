// /app/page.js
"use client";

import { useState } from 'react';
import InvoiceModal from '../components/InvoiceModal';
import InvoicePreview from '../components/InvoicePreview';

export default function HomePage() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [clientName, setClientName] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([{ description: '', amount: '' }]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceItems];
    newItems[index][field] = value;
    setInvoiceItems(newItems);
  };

  const addItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', amount: '' }]);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    // Optionally validate your data before opening the modal
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full">
      <h1 className="text-4xl font-light text-center mb-10">Invoice Generator</h1>
      <form onSubmit={handlePreview} className="space-y-8">
        {/* Logo Upload */}
        <div>
          <label className="block text-lg font-medium mb-2">Upload Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="block w-full text-sm text-gray-700
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          {logoPreview && (
            <div className="mt-4">
              <h2 className="text-lg font-medium">Logo Preview:</h2>
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="max-w-xs mt-2 rounded-xl object-contain"
              />
            </div>
          )}
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-lg font-medium mb-2">Client Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Invoice Items */}
        <div>
          <h2 className="text-2xl font-light mb-4">Invoice Items</h2>
          {invoiceItems.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                required
                className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
              />
              <input
                type="number"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                required
                className="w-full sm:w-40 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-colors"
          >
            Add Item
          </button>
        </div>

        {/* This button now solely triggers the modal */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors"
        >
          Preview Invoice
        </button>
      </form>

      {/* Modal for Invoice Preview */}
      <InvoiceModal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <InvoicePreview 
          logo={logoPreview} 
          clientName={clientName} 
          items={invoiceItems} 
        />
      </InvoiceModal>
    </div>
  );
}
