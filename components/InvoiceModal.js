// /components/InvoiceModal.js
"use client";

import * as Dialog from '@radix-ui/react-dialog';

export default function InvoiceModal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 shadow-2xl max-w-2xl w-full">
        <Dialog.Title className="text-2xl font-semibold mb-6">Invoice Preview</Dialog.Title>
        {children}
        <Dialog.Close asChild>
          <button className="mt-8 px-6 py-2 bg-gray-600 text-white rounded-full shadow hover:bg-gray-700 transition-colors">
            Close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
