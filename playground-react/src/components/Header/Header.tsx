import {FC} from "react";
import {useAppContext} from "../../providers/AppProvider";

const Header: FC = () => {
  const {theme, sidebarOpen, setSidebarOpen} = useAppContext();

  return (
    <header className={`flex items-center justify-between font-bold p-4`}>
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
      <button
        type={'button'}
        className={'bg-gray-300 rounded-md p-1 font-bold'}
      >Login</button>
    </header>
  );
};

export default Header;
