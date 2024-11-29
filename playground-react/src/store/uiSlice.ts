import {StateCreator} from "zustand";
import {UIState, UIStateProps} from "../types";

const initialStateProps: UIStateProps = {
  theme: 'light',
  uiMeta: {
    version: '1.0.0'
  }
}

const createUISlice: StateCreator<UIState> = (set) => ({
  ...initialStateProps,
  setTheme: (theme) => set({theme}),
  setVersion: (version) => set(state => ({uiMeta: {...state.uiMeta, version}})),
})

export default createUISlice;
