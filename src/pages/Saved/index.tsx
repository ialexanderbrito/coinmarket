import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import styles from './Saved.module.scss';

export function Saved() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const savedCrypto = JSON.parse(localStorage.getItem('saved') || '[]');

  function formatName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');
  }

  return (
    <>
      <Helmet title="Criptomoedas favoritas" />
      <div className={styles.home} data-theme={theme}>
        <Header />

        <div className={styles.container}>
          {savedCrypto && savedCrypto.length > 0 ? (
            <>
              {savedCrypto.map((crypto: any) => (
                <div
                  className={styles.item}
                  onClick={() => {
                    navigate(`/coin/${crypto}`);
                  }}
                >
                  <p>{formatName(crypto)}</p>
                </div>
              ))}
            </>
          ) : (
            <p>Você não tem nenhuma moeda salva.</p>
          )}
        </div>
      </div>
    </>
  );
}
