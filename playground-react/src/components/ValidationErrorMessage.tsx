import styles from "./SampleForm.module.css";

interface ValidationErrorMessageProps {
  id: string;
  errorMessage: string;
}

export default function ValidationErrorMessage({id, errorMessage}: ValidationErrorMessageProps) {
  return (
    <div id={id} className={styles.error}>{errorMessage}</div>
  );
}
