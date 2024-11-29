import {create} from "zustand/react";
import {AppState} from "../types";
import createFilterSlice from "../store/filterSlice";
import createUISlice from "../store/uiSlice";

const useAppStore = create<AppState>()((...args) => ({
  ...createFilterSlice(...args),
  ...createUISlice(...args)
}));

export default useAppStore;
