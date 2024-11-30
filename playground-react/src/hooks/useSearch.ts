import { useCallback } from "react";

const useSearch = () => {
  // returning a promise to offload the process outside the callstack
  const searchByText = useCallback(<T,>(array: T[], term: string) => {
    const termLowerCase = term.toLowerCase();

    function dfs(item: unknown): boolean {
      const itemType = Object.prototype.toString.call(item);

      switch (itemType) {
        case '[object Object]':
          return handleObjects(item);
        case '[object Array]':
          return handleArrays(item);
        default:
          return `${item}`.toString().toLowerCase().includes(termLowerCase);
      }
    }

    function handleObjects(obj: unknown) {
      for (let value of Object.values(obj as {})) {
        if (dfs(value)) {
          return true;
        }
      }

      return false;
    }

    function handleArrays(arr: unknown) {
      for (let item of arr as []) {
        if (dfs(item)) {
          return true;
        }
      }

      return false;
    }

    return new Promise<T[]>((resolve, reject) => {
      const result = array.filter(item => dfs(item));
      resolve(result);
    });
  }, []);

  const searchByPermissionInclusion = useCallback(<T extends { permission: string },>(array: T[], permissions: string[]) => {
    const permissionsSet = new Set(permissions);
    return array.filter(item => permissionsSet.has(item.permission));
  }, []);

  const searchByPermissionExclusion = useCallback(<T extends { permission: string },>(array: T[], permissions: string[]) => {
    const permissionsSet = new Set(permissions);
    return array.filter(item => !permissionsSet.has(item.permission));
  }, []);

  return {searchByText, searchByPermissionInclusion, searchByPermissionExclusion};
};

export default useSearch;
