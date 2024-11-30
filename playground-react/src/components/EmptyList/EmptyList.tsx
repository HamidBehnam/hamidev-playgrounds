import useAppStore from "../../hooks/useAppStore";

const EmptyList = () => {
  const clearAllFilters = useAppStore(state => state.clearAllFilters);

  return (
    <div className={'flex flex-col items-center'}>
      <div className="empty-list">No items found</div>
      <div>Refine or reset the filters to see more items</div>
      <button className={`p-2 rounded-md bg-blue-500 text-white`} onClick={() => clearAllFilters()}>Reset filters</button>
    </div>
  );
}

export default EmptyList;
