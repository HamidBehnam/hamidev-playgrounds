import {FC} from 'react';
import styles from './ValidationErrorMessage.module.css';

interface ValidationErrorMessageProps {
  id: string;
  errorMessage?: string
}

const ValidationErrorMessage: FC<ValidationErrorMessageProps> = ({id, errorMessage}) => {
  return (
    <div className={styles.errorMessage} id={id}>
      {errorMessage}
    </div>
  );
};

export default ValidationErrorMessage;
