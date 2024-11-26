export interface PermissionOption {
  label: string;
  value: Permission;
}

export enum Permission {
  Manage = 'manage',
  View = 'view',
  Suspended = 'suspended'
}

export interface FilterData {
  term: string;
  inclusionType: 'INCLUDE' | 'EXCLUDE';
  includedPermissions: string[];
  excludedPermissions: string[];
}

export interface AppState {
  filterData: FilterData;
  userIntervened: boolean;
}

export type AppAction =
  | { type: "SET_TERM"; payload: string }
  | { type: "SET_INCLUSION"; payload: 'INCLUDE' | 'EXCLUDE' }
  | { type: "SET_INCLUDED_PERMISSIONS"; payload: string[] }
  | { type: "SET_EXCLUDED_PERMISSIONS"; payload: string[] }
  | { type: "SET_USER_INTERVENED"; payload: boolean }
  | { type: "CLEAR_ALL_FILTERS"; }
