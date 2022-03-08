import { ChangeEvent, createContext, useContext, useState } from 'react';

import { IHeaderContext } from 'types/IContext';

const Header = createContext({} as IHeaderContext);

export function HeaderProvider({ children }: any) {
  const [currency, setCurrency] = useState(() => {
    const storagedCurrency = localStorage.getItem('currency');

    if (storagedCurrency) {
      return storagedCurrency;
    }

    return 'BRL';
  });

  const handleCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
    const currency = event.target.value;

    localStorage.setItem('currency', currency);

    setCurrency(currency);
  };

  return (
    <Header.Provider
      value={{
        currency,
        setCurrency,
        handleCurrency,
      }}
    >
      {children}
    </Header.Provider>
  );
}

export function useHeader() {
  const context = useContext(Header);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
