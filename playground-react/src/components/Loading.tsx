import React, {FC} from 'react';
import styles from './Loading.module.css';

const Loading: FC = () => {
  return (
    <div className={styles.loader}></div>
  );
};

export default Loading;
