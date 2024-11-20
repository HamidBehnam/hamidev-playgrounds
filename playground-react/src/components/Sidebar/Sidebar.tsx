import {FC} from "react";
import {useAppContext} from "../../providers/AppProvider";

const Sidebar: FC = () => {
  const {sidebarOpen, setSidebarOpen} = useAppContext();

  if (!sidebarOpen) {
    return null;
  }

  return (
    <div className={`p-4 absolute md:static w-full md:w-64 bg-gray-300`}>
      <div className={'mb-3'}>
        <button
          className={'bg-white rounded-md p-1 font-bold'}
          type={'button'}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >Toggle</button>
      </div>
      <div>Sidebar content</div>
    </div>
  );
};

export default Sidebar;
