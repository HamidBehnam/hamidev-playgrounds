import { StateCreator } from "zustand";
import {FilterState, FilterStateProps} from "../types";

const initialState: FilterStateProps = {
  filterData: {
    term: "",
    inclusionType: "INCLUDE",
    includedPermissions: ['manage', 'view', 'suspended'],
    excludedPermissions: []
  },
  userIntervened: false
};

const createFilterSlice: StateCreator<FilterState> = (set) => ({
  ...initialState,
  setTerm: (term) => set(state => ({filterData: {...state.filterData, term}})),
  setInclusion: (inclusionType) => set(state => ({filterData: {...state.filterData, inclusionType}})),
  setIncludedPermissions: (permissions) => set(state => ({filterData: {...state.filterData, includedPermissions: permissions}})),
  setExcludedPermissions: (permissions) => set(state => ({filterData: {...state.filterData, excludedPermissions: permissions}})),
  setUserIntervened: (userIntervened) => set({userIntervened}),
  clearAllFilters: () => set(initialState),
});

export default createFilterSlice;
