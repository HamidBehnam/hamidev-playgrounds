import React, { useEffect, useCallback, ChangeEvent, useMemo } from "react";
import { Box, Button, Input } from "@mui/material";
import { localStorageItem, permissionOptions } from "../../constants";
import useAppStore from "../../hooks/useAppStore";
import { MenuFilter } from "../MenuFilter/MenuFilter";
import useThrottle from "../../hooks/useThrottle";
import {AppState, FilterData} from "../../types";

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
    setResetSignal
  } = useAppStore((state: AppState) => state);

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
    setResetSignal(event.target.value ? false : true);
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" sx={{ padding: 1 }}>
      <Input
        placeholder="Find users..."
        value={filterData.term}
        onChange={handleSearchTermChange}
        type={'search'}
      />
      <Box display="flex" gap={1}>
        <Button 
          disabled={!filtersAreApplied}
          onClick={() => clearAllFilters()}
        >
          Reset Filters
        </Button>
        <MenuFilter options={permissionOptions} label="Permission" />
      </Box>
    </Box>
  );
};
