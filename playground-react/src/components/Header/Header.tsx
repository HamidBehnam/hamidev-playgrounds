import {FC} from "react";
import styles from './Header.module.css';
import {useAppContext} from "../../providers/AppProvider";

const Header: FC = () => {
  const {theme, sidebarOpen, setSidebarOpen} = useAppContext();

  return (
    <>
      <div className={`${styles.header} font-bold`}>
        {!sidebarOpen && (
          <button
            type={'button'}
            className={'bg-gray-300 rounded-md p-1 font-bold'}
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
