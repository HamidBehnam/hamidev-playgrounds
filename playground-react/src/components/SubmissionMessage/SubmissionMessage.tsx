import {FC} from "react";
import styles from './SubmissionMessage.module.css';

interface SubmissionMessageProps {
  message: string;
  success: boolean;
}

const SubmissionMessage: FC<SubmissionMessageProps> = ({message, success}) => {
  return (
    <div className={`${styles.validationMessage} ${success ? styles.success : styles.error}`} role={success ? 'status' : 'alert'}>
      {message}
    </div>
  );
};

export default SubmissionMessage;
