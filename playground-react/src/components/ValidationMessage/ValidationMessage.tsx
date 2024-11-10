import {FC} from "react";
import styles from './ValidationMessage.module.css';

interface ValidationMessageProps {
  id: string;
  message: string;
}

const ValidationMessage: FC<ValidationMessageProps> = ({message, id}) => {
  return (
    <div className={styles.validationErrorMessage} role="alert" id={id}>
      {message}
    </div>
  );
};

export default ValidationMessage;
