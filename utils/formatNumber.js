export function formatNumber(value) {
  // Remove any non-digit characters except decimal point and commas
  let number = value.replace(/[^\d.,]/g, '');
  
  // Remove all commas
  number = number.replace(/,/g, '');
  
  // Ensure only one decimal point
  const parts = number.split('.');
  if (parts.length > 2) {
    number = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Don't format if it's just a decimal point
  if (number === '.') return number;
  
  // Format the whole number part with commas
  if (parts.length > 0) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  return parts.join('.');
}

export function unformatNumber(value) {
  // Remove commas and ensure it returns a valid number string
  const number = value.replace(/,/g, '');
  return isNaN(parseFloat(number)) ? '0' : number;
} 