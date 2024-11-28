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

export interface FilterStateProps {
  filterData: FilterData;
  userIntervened: boolean;
}

export interface FilterStateActions {
  setTerm: (term: string) => void;
  setInclusion: (inclusionType: 'INCLUDE' | 'EXCLUDE') => void;
  setIncludedPermissions: (permissions: string[]) => void;
  setExcludedPermissions: (permissions: string[]) => void;
  setUserIntervened: (userIntervened: boolean) => void;
  clearAllFilters: () => void;
}

export type FilterState = FilterStateProps & FilterStateActions;

// AppState is the combination of all the states in the app
export type AppState = FilterState;
