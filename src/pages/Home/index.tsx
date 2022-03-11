import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import {
  Input,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  CircularProgress,
  Select,
} from '@chakra-ui/react';
import { formatCurrency } from '@coingecko/cryptoformat';
import {
  Paginator,
  Container,
  PageGroup,
  usePaginator,
} from 'chakra-paginator';
import cx from 'classnames';
import { CryptoResponse } from 'types/ICrypto';

import { ButtonSave } from 'components/ButtonSave';
import { Header } from 'components/Header';

import { useHeader } from 'contexts/Header';
import { useTheme } from 'contexts/Theme';

import { useHome } from 'hooks/useHome';
import { usePagination } from 'hooks/usePagination';

import { formatPercent2Decimal } from 'utils/formatPercent';

import { getCoinsMarkets } from 'services/getCoin';

import styles from './Home.module.scss';

const TIME_INTERVAL_ONE_MINUTE = 1000 * 60;

const headCells = [
  {
    Header: '#',
  },
  {
    Header: 'Moeda',
  },
  {
    Header: 'Preço',
  },
  {
    Header: '1h',
  },
  {
    Header: '24h',
  },
  {
    Header: 'Capitalização de Mercado',
  },
];

export function Home() {
  const { theme } = useTheme();
  const { currency } = useHeader();

  const {
    coins,
    isLoading,
    search,
    setSearch,
    setCoins,
    setIsLoading,
    pageSize,
    handlePageCurrency,
    handleSearchCrypto,
    handlePageSizeChange,
  } = useHome();

  const { outerLimit, innerLimit, baseStyles, activeStyles, separatorStyles } =
    usePagination();

  const { currentPage, setCurrentPage, pagesQuantity } = usePaginator({
    total: 200,
    initialState: { currentPage: 1, pageSize: 10 },
  });

  async function buscaExchange() {
    const { data } = await getCoinsMarkets(currency, pageSize, currentPage);

    setCoins(data);
  }

  useEffect(() => {
    setIsLoading(true);
    buscaExchange();
    setIsLoading(false);
  }, [currency, currentPage, pageSize]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      buscaExchange();
      setIsLoading(false);
    }, TIME_INTERVAL_ONE_MINUTE);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (search !== '') {
      setCoins(handleSearchCrypto());
    } else {
      buscaExchange();
    }
  }, [search]);

  return (
    <>
      <Helmet title={'CryptoMarket 📈'} />
      <div className={styles.home} data-theme={theme}>
        <Header />

        <div className={styles.containerSearch}>
          <Input
            placeholder="Buscar criptomoeda por nome ou símbolo"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            size="md"
            focusBorderColor="purple.600"
          />
        </div>

        {isLoading ? (
          <CircularProgress isIndeterminate color="green.300" />
        ) : (
          <div className={styles.container}>
            <div className={styles.table}>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    {headCells.map((headCell) => (
                      <Th
                        color={theme === 'light' ? 'gray.700' : 'gray.100'}
                        key={headCell.Header}
                      >
                        {headCell.Header}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {coins.map((coin: CryptoResponse) => (
                    <Tr key={coin?.id}>
                      <Td>{coin.market_cap_rank}</Td>
                      <Td
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handlePageCurrency(coin.id);
                        }}
                      >
                        <div className={styles.nameContainer}>
                          <div className={styles.nameCoin}>
                            <img
                              src={coin?.image}
                              alt={coin?.id}
                              className={styles.imageCoin}
                            />
                            <p className={styles.name}>{coin.name}</p>
                          </div>

                          <Badge>{coin.symbol.toUpperCase()}</Badge>
                        </div>
                      </Td>
                      <Td>
                        {currency === 'BRL' ? (
                          <span>
                            {formatCurrency(
                              Number(coin.current_price),
                              'BRL',
                              'pt-BR',
                            )}
                          </span>
                        ) : (
                          <span>
                            {formatCurrency(
                              Number(coin.current_price),
                              'USD',
                              'en',
                            )}
                          </span>
                        )}
                      </Td>
                      <Td
                        className={cx(styles.negative, {
                          [styles.positive]:
                            coin.price_change_percentage_1h_in_currency >= 0,
                        })}
                      >
                        <p>
                          {formatPercent2Decimal(
                            coin.price_change_percentage_1h_in_currency,
                          )}
                        </p>
                      </Td>
                      <Td
                        className={cx(styles.negative, {
                          [styles.positive]:
                            coin.price_change_percentage_24h >= 0,
                        })}
                      >
                        <p>
                          {formatPercent2Decimal(
                            coin.price_change_percentage_24h,
                          )}
                        </p>
                      </Td>
                      <Td>
                        {currency === 'BRL' ? (
                          <span>
                            {formatCurrency(
                              Number(coin.market_cap),
                              'BRL',
                              'pt-BR',
                            )}
                          </span>
                        ) : (
                          <span>
                            {formatCurrency(
                              Number(coin.market_cap),
                              'USD',
                              'en',
                            )}
                          </span>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
            <div className={styles.paginator}>
              <Paginator
                pagesQuantity={pagesQuantity}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                activeStyles={activeStyles}
                normalStyles={baseStyles}
                separatorStyles={separatorStyles}
                outerLimit={outerLimit}
                innerLimit={innerLimit}
              >
                <Container
                  align="center"
                  justify="space-between"
                  w="full"
                  p={4}
                >
                  <Select
                    w={20}
                    ml={0}
                    backgroundColor="gray.100"
                    focusBorderColor="purple.600"
                    onChange={handlePageSizeChange}
                    color={theme === 'light' ? 'gray.700' : 'gray.500'}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </Select>
                  <PageGroup isInline align="center" />
                </Container>
              </Paginator>
            </div>

            <ButtonSave />
          </div>
        )}
      </div>
    </>
  );
}
