import { StateCreator } from "zustand";
import {FilterState, FilterStateProps} from "../types";

const initialStateProps: FilterStateProps = {
  filterData: {
    term: "",
    inclusionType: "INCLUDE",
    includedPermissions: ['manage', 'view', 'suspended'],
    excludedPermissions: []
  },
  userIntervened: false
};

const createFilterSlice: StateCreator<FilterState> = (set) => ({
  ...initialStateProps,
  setTerm: (term) => set(state => ({filterData: {...state.filterData, term}})),
  setInclusion: (inclusionType) => set(state => ({filterData: {...state.filterData, inclusionType}})),
  setIncludedPermissions: (permissions) => set(state => ({filterData: {...state.filterData, includedPermissions: permissions}})),
  setExcludedPermissions: (permissions) => set(state => ({filterData: {...state.filterData, excludedPermissions: permissions}})),
  setUserIntervened: (userIntervened) => set({userIntervened}),
  clearAllFilters: () => set(initialStateProps),
});

export default createFilterSlice;
