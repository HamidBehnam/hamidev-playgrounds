import {FC} from "react";
import styles from './Header.module.css';
import {useAppContext} from "../../providers/AppProvider";

const Header: FC = () => {
  const {theme} = useAppContext();

  return (
    <div className={styles.header}>Header, Current Theme: {theme}</div>
  );
};

export default Header;
