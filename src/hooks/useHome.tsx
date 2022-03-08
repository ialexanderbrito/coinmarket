import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CryptoResponse } from 'types/ICrypto';

export function useHome() {
  const navigate = useNavigate();

  const [coins, setCoins] = useState<CryptoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);

  function handlePageCurrency(name: string) {
    navigate(`/coin/${name}`);
  }

  function handleSearchCrypto() {
    return coins.filter(
      (coin: CryptoResponse) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search),
    );
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  return {
    coins,
    isLoading,
    search,
    setSearch,
    setCoins,
    setIsLoading,
    pageSize,
    setPageSize,
    handlePageCurrency,
    handleSearchCrypto,
    handlePageSizeChange,
  };
}
