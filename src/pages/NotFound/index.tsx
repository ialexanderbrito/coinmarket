import { Link } from 'react-router-dom';

import { Button } from '@chakra-ui/react';
import error404 from 'assets/error404.png';

import { useTheme } from 'contexts/Theme';

import styles from './NotFound.module.scss';

export function NotFound() {
  const { theme } = useTheme();
  return (
    <div className={styles.home} data-theme={theme}>
      <img src={error404} alt="Error 404" />
      <h1>Ops, algo deu errado</h1>
      <p>Desculpe, não conseguimos encontrar sua página</p>

      <br />
      <br />

      <Button colorScheme="purple" variant="outline">
        <Link to="/">Voltar para a Home</Link>
      </Button>
    </div>
  );
}
