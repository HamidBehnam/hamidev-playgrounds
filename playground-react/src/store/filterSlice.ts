import { StateCreator } from "zustand";
import { FilterState, FilterStateProps } from "../types";

const initialStateProps: FilterStateProps = {
    filterData: {
        term: "",
        inclusionType: "INCLUDE",
        includedPermissions: ['manage', 'view', 'suspended'],
        excludedPermissions: [],
    },
    userIntervened: false,
    resetSignal: false,
};

const createFilterSlice: StateCreator<FilterState> = (set) => ({
    ...initialStateProps,
    setTerm: (term: string) => set(state => ({filterData: {...state.filterData, term}})),
    setInclusion: (inclusionType: 'INCLUDE' | 'EXCLUDE') => set(state => ({filterData: {...state.filterData, inclusionType}})),
    setIncludedPermissions: (permissions: string[]) => set(state => ({filterData: {...state.filterData, includedPermissions: permissions}})),
    setExcludedPermissions: (permissions: string[]) => set(state => ({filterData: {...state.filterData, excludedPermissions: permissions}})), 
    setUserIntervened: (userIntervened: boolean) => set({userIntervened}),
    clearAllFilters: () => set({...initialStateProps, userIntervened: true, resetSignal: true}),
    setResetSignal: (resetSignal: boolean) => set({resetSignal})
});

export default createFilterSlice;
