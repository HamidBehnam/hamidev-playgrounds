import {Permission, PermissionOption} from "../../types";

export const permissionOptions: PermissionOption[] = [
  { label: "Manage", value: Permission.Manage },
  { label: "View", value: Permission.View },
  { label: "Suspended", value: Permission.Suspended },
];

export const localStorageItem = 'LM_Assignment_FilterData';
