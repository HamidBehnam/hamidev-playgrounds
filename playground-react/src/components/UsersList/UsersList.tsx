import React, {useState, useEffect, useCallback} from "react";
import { useQuery } from "@tanstack/react-query";
import useUsersApi from "../../hooks/useUsersApi";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useAppStore from "../../hooks/useAppStore";
import useDebounce from "../../hooks/useDebounce";
import useSearch from "../../hooks/useSearch";
import { List } from "@mui/material";
import UsersListItem from "../UsersListItem/UsersListItem";
import EmptyList from "../EmptyList/EmptyList";
import useCache from "../../hooks/useCache";
import {AppState} from "../../types";


const UsersList = () => {
  const cache = useCache({capacity: 5});
  const { getUsers } = useUsersApi();
  const {
    filterData: {
      term,
      inclusionType,
      includedPermissions,
      excludedPermissions
    },
    userIntervened,
    resetSignal,
  } = useAppStore((state: AppState) => state);
    const {
    data: users,
    error,
    isLoading,
  } = useQuery({ queryKey: ["users", {term}], queryFn: getUsers });
  const [currentUsers, setCurrentUsers] = useState([]);

  
  const debouncedTerm = useDebounce(term, resetSignal ? 0 : 500);
  const {searchByText, searchByPermissionInclusion, searchByPermissionExclusion} = useSearch();

  useEffect(() => {
    // converted to async to avoid occupying the callstack while performing the search.
    const handleSearch = async () => {
      if (users) {
        let searchResult = users;
  
        let cacheKey = getCacheKey(debouncedTerm, inclusionType, includedPermissions, excludedPermissions);
  
        let cachedResult = cache.get(cacheKey);
  
        if (cachedResult) {
          searchResult = cachedResult;
        } else {
          if (debouncedTerm.trim()) {
            searchResult = await searchByText(searchResult, debouncedTerm);
          }
    
          if (inclusionType === 'INCLUDE') {
            searchResult = searchByPermissionInclusion(searchResult, includedPermissions);
          } else if (inclusionType === 'EXCLUDE') {
            searchResult = searchByPermissionExclusion(searchResult, excludedPermissions);
          }
  
          cache.put(cacheKey, searchResult);
        }
  
        setCurrentUsers(searchResult);
      }
    };

    handleSearch();
  }, [users, debouncedTerm, inclusionType, includedPermissions, excludedPermissions]);

  useEffect(() => {
    // clean-up function
    return () => cache.clear();
  }, []);

  const getCacheKey = useCallback((
    term: string, 
    inclusionType: string, 
    includedPermissions: string[], 
    excludedPermissions: string[]
  ) => {
    return `${term}_${inclusionType}_${includedPermissions.sort().join(',')}_${excludedPermissions.sort().join(',')}`;
  }, []);

  if (isLoading) return <LoadingIndicator />;
  
  if (error) return <ErrorMessage message={"Error fetching the users list"} />;

  if (currentUsers.length === 0) return <EmptyList />; 

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'grid', gap: 1, gridTemplateColumns: `repeat(auto-fill, minmax(330px, 1fr))`}}>
      {currentUsers.map((user: any, index) => (
        <UsersListItem user={user} key={index}/>
      ))}
    </List>
  );
};

export default UsersList;

