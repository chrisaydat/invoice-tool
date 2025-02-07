// /app/page.js
"use client";

import { useState } from 'react';
import InvoiceModal from '../components/InvoiceModal';
import InvoicePreview from '../components/InvoicePreview';
import { formatNumber, unformatNumber } from '../utils/formatNumber';

export default function HomePage() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [clientName, setClientName] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([{ description: '', amount: '' }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currency, setCurrency] = useState("USD"); // default currency
  const [senderDetails, setSenderDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: generateInvoiceNumber(),
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    paymentTerms: 'Net 30'
  });
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

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
    if (field === 'amount') {
      // Format the number as the user types
      newItems[index][field] = formatNumber(value);
    } else {
      newItems[index][field] = value;
    }
    setInvoiceItems(newItems);
  };

  const addItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', amount: '' }]);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSenderChange = (field, value) => {
    setSenderDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClientChange = (field, value) => {
    setClientDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full">
      <h1 className="text-4xl font-light text-center mb-10">Invoice Generator</h1>
      <form onSubmit={handlePreview} className="space-y-8">
        {/* Sender Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-light mb-4">Your Details</h2>
          <input
            type="text"
            placeholder="Your Name/Company Name"
            value={senderDetails.name}
            onChange={(e) => handleSenderChange('name', e.target.value)}
            required
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={senderDetails.email}
            onChange={(e) => handleSenderChange('email', e.target.value)}
            required
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={senderDetails.address}
            onChange={(e) => handleSenderChange('address', e.target.value)}
            required
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            value={senderDetails.phone}
            onChange={(e) => handleSenderChange('phone', e.target.value)}
            required
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        {/* Client Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-light mb-4">Client Details</h2>
          <input
            type="text"
            placeholder="Client Name/Company Name"
            value={clientDetails.name}
            onChange={(e) => handleClientChange('name', e.target.value)}
            required
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Client Email"
            value={clientDetails.email}
            onChange={(e) => handleClientChange('email', e.target.value)}
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Client Address"
            value={clientDetails.address}
            onChange={(e) => handleClientChange('address', e.target.value)}
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Client Phone"
            value={clientDetails.phone}
            onChange={(e) => handleClientChange('phone', e.target.value)}
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency Segmented Control */}
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Currency:</span>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`px-4 py-2 rounded-full transition-colors ${
              currency === "USD"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            USD
          </button>
          <button
            type="button"
            onClick={() => setCurrency("GHS")}
            className={`px-4 py-2 rounded-full transition-colors ${
              currency === "GHS"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            GHS
          </button>
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
                type="text"
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

        {/* Invoice Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-light mb-4">Invoice Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoiceDetails.invoiceNumber}
                readOnly
                className="w-full p-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issue Date</label>
              <input
                type="date"
                value={invoiceDetails.issueDate}
                onChange={(e) => setInvoiceDetails(prev => ({...prev, issueDate: e.target.value}))}
                required
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Terms</label>
              <select
                value={invoiceDetails.paymentTerms}
                onChange={(e) => setInvoiceDetails(prev => ({...prev, paymentTerms: e.target.value}))}
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Net 30">Net 30</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 7">Net 7</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={invoiceDetails.dueDate}
                onChange={(e) => setInvoiceDetails(prev => ({...prev, dueDate: e.target.value}))}
                required
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Preview Invoice Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors"
        >
          Preview Invoice
        </button>
      </form>

      {/* Invoice Preview Modal */}
      <InvoiceModal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <InvoicePreview 
          logo={logoPreview} 
          clientDetails={clientDetails}
          items={invoiceItems} 
          currency={currency}
          senderDetails={senderDetails}
          invoiceDetails={invoiceDetails}
        />
      </InvoiceModal>
    </div>
  );
}

function generateInvoiceNumber() {
  const prefix = 'INV';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}
