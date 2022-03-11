import { useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Select, Text } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import logoImg from 'assets/logo.png';
import { CryptoSearchResponse } from 'types/ICrypto';

import { useHeader } from 'contexts/Header';
import { useTheme } from 'contexts/Theme';

import { getSearchCoin } from 'services/getCoin';

import styles from './Header.module.scss';

export function Header() {
  const navigate = useNavigate();
  const { switchTheme, theme } = useTheme();
  const { handleCurrency, currency } = useHeader();

  const [allCoins, setAllCoins] = useState<CryptoSearchResponse[]>([]);
  const [coinSelected, setCoinSelected] = useState('');

  async function buscaCoinAll() {
    const { data } = await getSearchCoin(coinSelected);

    setAllCoins(data.coins);
  }

  useEffect(() => {
    if (coinSelected !== '') {
      buscaCoinAll();
    }
  }, [coinSelected]);

  return (
    <div className={styles.header}>
      <div className={styles.containerLogo} onClick={() => navigate('/')}>
        <img
          aria-hidden="true"
          src={logoImg}
          alt="Logo"
          className={styles.logo}
        />
        <h1>CryptoMarket</h1>
      </div>

      <div className={styles.mode}>
        <div className={styles.searchContainer}>
          <div className={styles.containerAutoComplete}>
            <AutoComplete
              openOnFocus
              emptyState={
                <Text
                  fontSize="sm"
                  color="gray.500"
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  {allCoins.length === 0 &&
                    coinSelected !== '' &&
                    'Nenhum resultado encontrado'}
                </Text>
              }
            >
              <AutoCompleteInput
                placeholder="Buscar criptomoeda por nome ou símbolo"
                variant="outline"
                onChange={(e) => {
                  setCoinSelected(e.target.value);
                }}
                focusBorderColor="purple.600"
                size="sm"
              />
              <AutoCompleteList>
                {allCoins.map((coin: CryptoSearchResponse) => (
                  <>
                    <div
                      onClick={() => {
                        navigate(`/coin/${coin.id}`);
                        window.location.reload();
                      }}
                      className={styles.inputItem}
                    >
                      <Avatar size="sm" name={coin.name} src={coin.thumb} />
                      <Text ml="4" color="black">
                        {coin.name} ({coin.symbol})
                      </Text>
                    </div>
                  </>
                ))}
              </AutoCompleteList>
            </AutoComplete>
          </div>

          <div>
            <Select
              size="sm"
              focusBorderColor="purple.600"
              onChange={handleCurrency}
              value={currency}
              color={theme === 'light' ? 'gray.700' : 'gray.500'}
            >
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
            </Select>
          </div>
        </div>
        <div
          aria-hidden="true"
          onClick={() => {
            switchTheme();
          }}
        >
          {theme === 'light' ? (
            <>
              <Button variant="ghost" colorScheme="purple" _hover={{ bg: '' }}>
                <BiMoon size={20} color="#1b1b1b" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" colorScheme="purple" _hover={{ bg: '' }}>
                <BiSun size={20} color="#D7D3CE" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
