import { create } from "zustand";
import createFilterSlice from "../store/filterSlice";
import { AppState } from "../types";

const useAppStore = create<AppState>()((...args) => ({
    ...createFilterSlice(...args),
}));

export default useAppStore;
