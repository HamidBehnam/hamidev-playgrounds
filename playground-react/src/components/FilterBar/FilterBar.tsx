import React, { useEffect, useCallback, ChangeEvent, useMemo } from "react";
import { localStorageItem, permissionOptions } from "../../constants";
import { useAppContext } from "../../providers/AppProvider";
import useThrottle from "../../hooks/useThrottle";
import { FilterData } from "../../types";
import PermissionSelector from "../PermissionSelector/PermissionSelector";

export const FilterBar = () => {
  const { state, dispatch } = useAppContext();
  const throttledFilterData = useThrottle(state.filterData);
  const filtersAreApplied = useMemo(() =>
    state.filterData.term ||
    state.filterData.includedPermissions.length !== 3 ||
    state.filterData.excludedPermissions.length !== 0, [state.filterData]);

  useEffect(() => {
    const restoredFilterDataSerialized = localStorage.getItem(localStorageItem);

    if (restoredFilterDataSerialized) {
      const restoredFilterData: FilterData = JSON.parse(restoredFilterDataSerialized);
      dispatch({type: 'SET_TERM', payload: restoredFilterData.term});
      dispatch({type: 'SET_INCLUSION', payload: restoredFilterData.inclusionType});
      dispatch({type: 'SET_INCLUDED_PERMISSIONS', payload: restoredFilterData.includedPermissions});
      dispatch({type: 'SET_EXCLUDED_PERMISSIONS', payload: restoredFilterData.excludedPermissions});
    }
  }, []);

  useEffect(() => {
    if (state.userIntervened) {
      localStorage.setItem(localStorageItem, JSON.stringify(throttledFilterData));
    }
  }, [throttledFilterData]);

  const handleSearchTermChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_TERM", payload: event.target.value });
    dispatch({ type: "SET_USER_INTERVENED", payload: true});
  }, []);

  return (
    <div className={'flex justify-between items-center pb-10'}>
      <input
        placeholder="Find users..."
        value={state.filterData.term}
        onChange={handleSearchTermChange}
        className={'p-2 border border-gray-300 rounded-md w-1/3'}
      />
      <div className={'flex items-center gap-2'}>
        <button
          onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}
          disabled={!filtersAreApplied}
          className={`p-2 rounded-md ${filtersAreApplied ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
        >
          Clear filters
        </button>
        <PermissionSelector options={permissionOptions} />
      </div>
    </div>
  );
};
