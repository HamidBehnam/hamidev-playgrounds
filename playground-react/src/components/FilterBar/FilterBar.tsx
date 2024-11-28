import React, { useEffect, useCallback, ChangeEvent, useMemo } from "react";
import { localStorageItem, permissionOptions } from "../../constants";
import useAppStore from "../../hooks/useAppStore";
import useThrottle from "../../hooks/useThrottle";
import { FilterData } from "../../types";
import PermissionSelector from "../PermissionSelector/PermissionSelector";

export const FilterBar = () => {
  const {
    filterData,
    userIntervened,
    setTerm,
    setInclusion,
    setIncludedPermissions,
    setExcludedPermissions,
    setUserIntervened,
    clearAllFilters,
  } = useAppStore(state => state);

  const throttledFilterData = useThrottle(filterData);
  const filtersAreApplied = useMemo(() =>
    filterData.term ||
    filterData.includedPermissions.length !== 3 ||
    filterData.excludedPermissions.length !== 0, [filterData]);

  useEffect(() => {
    const restoredFilterDataSerialized = localStorage.getItem(localStorageItem);

    if (restoredFilterDataSerialized) {
      const restoredFilterData: FilterData = JSON.parse(restoredFilterDataSerialized);
      setTerm(restoredFilterData.term);
      setInclusion(restoredFilterData.inclusionType);
      setIncludedPermissions(restoredFilterData.includedPermissions);
      setExcludedPermissions(restoredFilterData.excludedPermissions);
    }
  }, []);

  useEffect(() => {
    if (userIntervened) {
      localStorage.setItem(localStorageItem, JSON.stringify(throttledFilterData));
    }
  }, [throttledFilterData]);

  const handleSearchTermChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
    setUserIntervened(true);
  }, []);

  return (
    <div className={'flex justify-between items-center pb-10'}>
      <input
        placeholder="Find users..."
        value={filterData.term}
        onChange={handleSearchTermChange}
        className={'p-2 border border-gray-300 rounded-md w-1/3'}
      />
      <div className={'flex items-center gap-2'}>
        <button
          onClick={() => clearAllFilters()}
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
