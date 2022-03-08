import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { CryptoChartResponse } from 'types/ICrypto';

import { useHeader } from 'contexts/Header';

import { getCoinName, getMarketCharts, getTrending } from 'services/getCoin';

export function useCoin() {
  const { id } = useParams();
  const name = id?.toLowerCase();
  const { currency } = useHeader();

  const [btc, setBtc] = useState<any>(null);
  const [coin, setCoin] = useState<any>(null);
  const [trending, setTrending] = useState<any>(null);
  const [historicData, setHistoricData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [days, setDays] = useState('1');

  async function buscaCharts() {
    const { data } = await getMarketCharts(currency, name || '', days);

    setHistoricData(data.prices);
  }

  async function buscaBitcoin() {
    const { data } = await getCoinName('bitcoin');

    setBtc(data);
  }

  async function buscaCoin() {
    const { data } = await getCoinName(name || '');

    setCoin(data);
  }

  async function buscaTrending() {
    const { data } = await getTrending();

    setTrending(data.coins);
  }

  function dataChart(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');

    const gradientFill = ctx?.createLinearGradient(0, 0, 0, 500);
    gradientFill?.addColorStop(0, 'rgb(110,50,166)');
    gradientFill?.addColorStop(0.5, 'rgb(110,50,166, 0.6)');
    gradientFill?.addColorStop(1, 'rgb(110,50,166, 0.2)');

    return {
      labels: historicData?.map((coin: CryptoChartResponse) => {
        const date = new Date(coin[0]);
        const time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${
                date.getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes()
              }`
            : `${date.getHours()}:${
                date.getMinutes() < 10 ? '0' : ''
              }${date.getMinutes()}`;

        return time;
      }),

      datasets: [
        {
          data: historicData?.map((coin: CryptoChartResponse) => coin[1]),
          label: `Preço nos últimos ${days} em ${currency}`,
          borderColor: '#8a2be2',
          backgroundColor: gradientFill,
          fill: true,
          tension: 0.1,
        },
      ],
    };
  }

  const optionsChart = {
    elements: {
      line: {
        tension: 0.1,
      },
      point: {
        radius: 2,
      },
    },
  };

  return {
    btc,
    coin,
    trending,
    historicData,
    days,
    setDays,
    isLoading,
    setIsLoading,
    buscaCharts,
    buscaBitcoin,
    buscaCoin,
    buscaTrending,
    dataChart,
    optionsChart,
  };
}
