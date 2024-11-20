import {FC} from "react";
import styles from './Header.module.css';
import {useAppContext} from "../../providers/AppProvider";

const Header: FC = () => {
  const {theme, sidebarOpen, setSidebarOpen} = useAppContext();

  return (
    <>
      <div className={styles.header}>
        {!sidebarOpen && (
          <button
            type={'button'}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >Toggle</button>
        )}
        <div>
          Header, Current Theme: {theme}
        </div>
      </div>
    </>
  );
};

export default Header;
