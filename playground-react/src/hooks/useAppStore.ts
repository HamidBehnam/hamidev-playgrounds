import {create} from "zustand/react";
import {AppState} from "../types";
import createFilterSlice from "../store/filterSlice";

const useAppStore = create<AppState>()((...args) => ({
  ...createFilterSlice(...args),
}));

export default useAppStore;
