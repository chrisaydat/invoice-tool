import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePdf(element) {
  if (!element) return;
  
  // Capture the element as a canvas
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  // Create a new PDF document
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Calculate the height of the image to fit the width
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pdfWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save('invoice.pdf');
}
