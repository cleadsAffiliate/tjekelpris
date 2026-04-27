const daFormatter = new Intl.NumberFormat('da-DK', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const daIntegerFormatter = new Intl.NumberFormat('da-DK', {
  maximumFractionDigits: 0,
});

const daKwhFormatter = new Intl.NumberFormat('da-DK', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const daCurrencyFormatter = new Intl.NumberFormat('da-DK', {
  style: 'currency',
  currency: 'DKK',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return daFormatter.format(value);
}

export function formatInteger(value: number): string {
  return daIntegerFormatter.format(value);
}

export function formatKwhPrice(value: number): string {
  return daKwhFormatter.format(value);
}

export function formatCurrency(value: number): string {
  return daCurrencyFormatter.format(value);
}

export function formatMonthly(kr: number): string {
  return `${formatInteger(kr)} kr/md.`;
}

export function formatYearly(kr: number): string {
  return `${formatInteger(kr)} kr/år`;
}

export function formatKwh(kwh: number): string {
  return `${formatInteger(kwh)} kWh`;
}

export function formatOrePerKwh(ore: number): string {
  return `${daFormatter.format(ore)} øre/kWh`;
}

export function formatDateDa(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function formatDateDaShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}
