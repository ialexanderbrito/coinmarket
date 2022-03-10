import { AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import styles from './ButtonSave.module.scss';

export function ButtonSave() {
  const navigate = useNavigate();

  return (
    <button
      className={styles.buttonSave}
      type="button"
      onClick={() => {
        navigate('/save');
      }}
    >
      <AiOutlineStar size={24} color="#FFF" />
    </button>
  );
}
