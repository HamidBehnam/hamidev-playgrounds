import { Permission, PermissionOption } from "../../types";

export const permissionOptions: PermissionOption[] = [
  { label: "Manage", value: Permission.Manage },
  { label: "View", value: Permission.View },
  { label: "Suspended", value: Permission.Suspended },
];

export const inclusionTypes = {
  INCLUDE: "INCLUDE",
  EXCLUDE: "EXCLUDE",
};

export const localStorageItem = 'LM_Assignment_FilterData';

export const defaultCacheCapacity = 3;

export const defaultCacheExpiration = 10 * 60 * 1000;
