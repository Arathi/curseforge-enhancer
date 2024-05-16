export function formatNumber(value: number, fractionDigits = 2): string {
  if (value >= 100000000) {
    value /= 100000000;
    return `${value.toFixed(fractionDigits)} 亿`;
  }
  if (value >= 10000) {
    value /= 10000;
    return `${value.toFixed(fractionDigits)} 万`;
  }
  return `${value}`;
}

export function formatFileSize(bytes: number, fractionDigits = 2): string {
  if (bytes >= 1_000_000_000) {
    const giga = bytes / 1_000_000_000;
    return `${giga.toFixed(fractionDigits)} GB`;
  }
  if (bytes >= 1_000_000) {
    const mega = bytes / 1_000_000;
    return `${mega.toFixed(fractionDigits)} MB`;
  }
  if (bytes >= 1_000) {
    const kilo = bytes / 1_000;
    return `${kilo.toFixed(fractionDigits)} kB`;
  }
  return `${bytes} B`;
}
