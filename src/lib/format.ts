export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPhone = (phone: string): string => {
  if (phone.startsWith('0')) {
    return phone.replace('0', '62');
  }
  return phone;
};
