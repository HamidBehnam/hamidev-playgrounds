export interface PermissionOption {
  label: string;
  value: Permission;
}

export enum Permission {
  Manage = 'manage',
  View = 'view',
  Suspended = 'suspended'
}

export interface CacheConfig {
  capacity?: number;
  expiration?: number;
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
  resetSignal: boolean;
}

export interface FilterStateActions {
  setTerm: (term: string) => void;
  setInclusion: (inclusionType: 'INCLUDE' | 'EXCLUDE') => void; 
  setIncludedPermissions: (permissions: string[]) => void;
  setExcludedPermissions: (permissions: string[]) => void;
  setUserIntervened: (userIntervened: boolean) => void;
  clearAllFilters: () => void;
  setResetSignal: (resetSignal: boolean) => void;
}

export type FilterState = FilterStateProps & FilterStateActions;

export type AppState = FilterState;