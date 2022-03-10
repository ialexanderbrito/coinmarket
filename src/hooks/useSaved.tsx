import { useState } from 'react';

import { CryptoResponse } from 'types/ICrypto';

export function useSaved() {
  const [cryptoFavorites, setCryptoFavorites] = useState([]);

  function handleSaveCryptoLocalStorage(crypto: string) {
    const cryptoData = JSON.parse(localStorage.getItem('saved') || '[]');
    setCryptoFavorites(cryptoData);

    if (cryptoData.length === 0) {
      localStorage.setItem('saved', JSON.stringify([crypto]));
    }

    const isExist = cryptoData.find((item: string) => item === crypto);

    if (!isExist) {
      localStorage.setItem('saved', JSON.stringify([...cryptoData, crypto]));
    }
  }

  function removeCryptoLocalStorage(crypto: string) {
    const cryptoData = JSON.parse(localStorage.getItem('saved') || '[]');
    setCryptoFavorites(cryptoData);

    const newCryptoData = cryptoData.filter((item: string) => item !== crypto);

    localStorage.setItem('saved', JSON.stringify(newCryptoData));
  }

  function verificarSeExisteNaLista(crypto: string) {
    const cryptoData = JSON.parse(localStorage.getItem('saved') || '[]');

    const isExist = cryptoData.find((item: string) => item === crypto);

    return isExist;
  }

  function saveCryptoFavorite(coin: CryptoResponse) {
    const isExist = verificarSeExisteNaLista(coin.id);

    if (isExist) {
      removeCryptoLocalStorage(coin.id);
    } else {
      handleSaveCryptoLocalStorage(coin.id);
    }
  }

  return {
    verificarSeExisteNaLista,
    cryptoFavorites,
    saveCryptoFavorite,
  };
}
