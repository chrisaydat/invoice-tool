// /utils/generatePdf.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePdf(element, returnDataUrl = false) {
  if (!element) return;

  // First clone the element and modify it for PDF
  const clone = element.cloneNode(true);
  clone.style.width = '800px'; // Set fixed width for consistency
  clone.style.padding = '40px';
  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 800,
      windowWidth: 800,
      onclone: (document) => {
        const element = document.querySelector('.invoice-content');
        if (element) {
          element.style.color = '#000000';
        }
      }
    });

    const imgData = canvas.toDataURL('image/png');

    // Use a4 page size
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40; // Add margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);

    if (returnDataUrl) {
      // Return PDF as base64 string
      return pdf.output('datauristring');
    } else {
      // Save PDF as file
      pdf.save('invoice.pdf');
    }
  } finally {
    // Clean up the clone
    document.body.removeChild(clone);
  }
}
