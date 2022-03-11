export function formatPercent2Decimal(value: number) {
  return `${value?.toPrecision(3).replace('-', '')}%`;
}
