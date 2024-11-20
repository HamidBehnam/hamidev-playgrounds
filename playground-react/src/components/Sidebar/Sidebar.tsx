import {FC} from "react";
import styles from './Sidebar.module.css';
import {useAppContext} from "../../providers/AppProvider";

const Sidebar: FC = () => {
  const {sidebarOpen, setSidebarOpen} = useAppContext();

  if (!sidebarOpen) {
    return null;
  }

  return (
    <div className={styles.sidebar}>
      <button
        type={'button'}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >Toggle</button>
      <div>Sidebar content</div>
    </div>
  );
};

export default Sidebar;
