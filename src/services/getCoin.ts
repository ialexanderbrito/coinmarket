import { api } from './api';

export async function getTrending() {
  const { data, status } = await api.get(`/search/trending`);

  return { data, status };
}

export async function getCoinsMarkets(
  currency: string,
  pageSize: number,
  page: number,
) {
  const { data, status } = await api.get(
    `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d%2C1h`,
  );

  return { data, status };
}

export async function getMarketCharts(
  currency: string,
  cryptoName: string,
  days: string,
) {
  const { data, status } = await api.get(
    `/coins/${cryptoName}/market_chart?vs_currency=${currency}&days=${days}`,
  );

  return { data, status };
}

export async function getCoinName(name: string) {
  const { data, status } = await api.get(`/coins/${name}`);

  return { data, status };
}

export async function getSearchCoin(name: string) {
  const { data, status } = await api.get(`search?query=${name}`);

  return { data, status };
}
