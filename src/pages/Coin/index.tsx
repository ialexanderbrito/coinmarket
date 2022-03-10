/* eslint-disable react/no-children-prop */
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet';
import { BiTransfer } from 'react-icons/bi';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  Input,
  InputGroup,
  InputLeftAddon,
  Stat,
  StatNumber,
} from '@chakra-ui/react';
import brazilFlag from 'assets/brazil.png';
import usaFlag from 'assets/usa.png';
import cx from 'classnames';
import { CryptoTrendingItemResponse } from 'types/ICrypto';

import { Header } from 'components/Header';

import { useHeader } from 'contexts/Header';
import { useTheme } from 'contexts/Theme';

import { useCoin } from 'hooks/useCoin';

import { formatBRL } from 'utils/formatBRL';
import { formatPercent2Decimal } from 'utils/formatPercent';
import { formatUSD } from 'utils/formatUSD';

import styles from './Coin.module.scss';

const TIME_INTERVAL_ONE_MINUTE = 1000 * 60;

export function Coin() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currency } = useHeader();

  const {
    btc,
    coin,
    trending,
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
  } = useCoin();

  const [crypto, setCrypto] = useState(0);
  const [gold, setGold] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    buscaBitcoin();
    buscaCoin();
    buscaTrending();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      buscaBitcoin();
      buscaCoin();
      setIsLoading(false);
    }, TIME_INTERVAL_ONE_MINUTE);

    setIsLoading(true);
    buscaTrending();
    setIsLoading(false);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    buscaCharts();
    setIsLoading(false);
  }, [currency, days]);

  useEffect(() => {
    setCrypto(0);
    setGold(0);
  }, [currency]);

  function handleChangeCrypto(event: any) {
    setCrypto(event.target.value);

    if (currency === 'BRL') {
      setGold(event.target.value * coin?.market_data?.current_price.brl);
    } else {
      setGold(event.target.value * coin?.market_data?.current_price.usd);
    }
  }

  function handleChangeGold(event: any) {
    setGold(event.target.value);

    if (currency === 'BRL') {
      setCrypto(event.target.value / coin?.market_data?.current_price.brl);
    } else {
      setCrypto(event.target.value / coin?.market_data?.current_price.usd);
    }
  }

  return (
    <>
      <Helmet
        title={
          !coin
            ? 'CryptoMarket 📈'
            : `${coin?.name} (${coin?.symbol?.toUpperCase()}) | CryptoMarket 📈`
        }
      />

      <div className={styles.wrapper} data-theme={theme}>
        <div className={styles.container}>
          <Header />

          <div className={styles.infoContainer}>
            <div className={styles.infoContent}>
              <Badge>Rank #{coin?.coingecko_rank}</Badge>

              <div className={styles.infoCrypto}>
                <img src={coin?.image.large} alt={coin?.name} />

                <h2>
                  {coin?.name} ({coin?.symbol?.toUpperCase()})
                </h2>
              </div>

              <div className={styles.infoPrice}>
                {currency === 'BRL' ? (
                  <h1>{formatBRL(coin?.market_data?.current_price.brl)}</h1>
                ) : (
                  <h1>{formatUSD(coin?.market_data?.current_price.usd)}</h1>
                )}
                <div
                  className={cx(styles.percentage, {
                    [styles.positive]:
                      coin?.market_data?.market_cap_change_percentage_24h >= 0,
                  })}
                >
                  {coin?.market_data?.market_cap_change_percentage_24h >= 0 ? (
                    <RiArrowUpSFill />
                  ) : (
                    <RiArrowDownSFill />
                  )}
                  {formatPercent2Decimal(
                    coin?.market_data?.market_cap_change_percentage_24h === null
                      ? 0
                      : coin?.market_data?.market_cap_change_percentage_24h,
                  )}
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <CircularProgress isIndeterminate color="green.300" />
          ) : (
            <>
              <div className={styles.containerChart}>
                <div className={styles.filter}>
                  <ButtonGroup size="sm" isAttached variant="outline">
                    <Button
                      colorScheme="purple"
                      mr="-px"
                      onClick={() => setDays('1')}
                      isActive={days === '1'}
                    >
                      24 horas
                    </Button>
                    <Button
                      colorScheme="purple"
                      mr="-px"
                      onClick={() => setDays('7')}
                      isActive={days === '7'}
                    >
                      7 dias
                    </Button>
                    <Button
                      colorScheme="purple"
                      mr="-px"
                      onClick={() => setDays('30')}
                      isActive={days === '30'}
                    >
                      30 dias
                    </Button>
                    <Button
                      colorScheme="purple"
                      mr="-px"
                      onClick={() => setDays('365')}
                      isActive={days === '365'}
                    >
                      1 ano
                    </Button>
                    <Button
                      colorScheme="purple"
                      mr="-px"
                      onClick={() => setDays('max')}
                      isActive={days === 'max'}
                    >
                      tudo
                    </Button>
                  </ButtonGroup>
                </div>
                <Line data={dataChart} options={optionsChart} />
              </div>
            </>
          )}

          <div className={styles.title}>
            <h1>
              Converta {coin?.symbol?.toUpperCase()} para {currency}
            </h1>
          </div>

          <div className={styles.converter}>
            <InputGroup>
              <InputLeftAddon
                children={
                  <Avatar
                    name={coin?.name}
                    src={coin?.image.large}
                    size="sm"
                    mr={2}
                  />
                }
              />
              <Input
                focusBorderColor="purple.600"
                type="number"
                placeholder="0"
                w={150}
                value={crypto}
                onChange={handleChangeCrypto}
              />
            </InputGroup>

            <div
              style={{
                display: 'flex',
                margin: '12px',
              }}
            >
              <BiTransfer size={32} color="#FFF" />
            </div>

            <InputGroup>
              <InputLeftAddon
                children={
                  <Avatar
                    name={coin?.name}
                    src={currency === 'BRL' ? brazilFlag : usaFlag}
                    size="sm"
                    mr={2}
                  />
                }
              />
              <Input
                focusBorderColor="purple.600"
                type="number"
                placeholder="0"
                w={150}
                value={gold}
                onChange={handleChangeGold}
              />
            </InputGroup>
          </div>

          <div className={styles.title}>
            <h1>🔥 Trends Cryptomoedas</h1>
          </div>

          <div className={styles.trending}>
            {isLoading ? (
              <CircularProgress isIndeterminate color="purple.300" />
            ) : (
              <>
                {trending?.map((trend: CryptoTrendingItemResponse) => (
                  <div
                    key={trend?.item.id}
                    className={styles.trendContainer}
                    onClick={() => {
                      navigate(`/coin/${trend?.item.id}`);
                      window.location.reload();
                    }}
                  >
                    <Stat>
                      <div className={styles.trendText}>
                        <Avatar src={trend?.item.large} size="sm" mr={2} />
                        {trend?.item.name}
                      </div>
                      <StatNumber>
                        {currency === 'BRL' ? (
                          <>
                            {formatBRL(
                              trend?.item.price_btc *
                                btc?.market_data?.current_price.brl,
                            )}
                          </>
                        ) : (
                          <>
                            {formatUSD(
                              trend?.item.price_btc *
                                btc?.market_data?.current_price.usd,
                            )}
                          </>
                        )}
                      </StatNumber>
                    </Stat>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
