import React, {useState, useEffect, useCallback} from "react";
import { useQuery } from "@tanstack/react-query";
import useUsersApi from "../../hooks/useUsersApi";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useAppStore from "../../hooks/useAppStore";
import useDebounce from "../../hooks/useDebounce";
import useSearch from "../../hooks/useSearch";
import UsersListItem from "../UsersListItem/UsersListItem";
import useCache from "../../hooks/useCache";
import EmptyList from "../EmptyList/EmptyList";


const UsersList = () => {
  const lruCache = useCache({capacity: 5});
  const { getUsers } = useUsersApi();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });
  const [currentUsers, setCurrentUsers] = useState([]);
  const {
    filterData: {
      term,
      inclusionType,
      includedPermissions,
      excludedPermissions
    },
    userIntervened,
  } = useAppStore(state => state);

  const debouncedTerm = useDebounce(term, userIntervened ? 500 : 0);
  const {searchByText, searchByPermissionInclusion, searchByPermissionExclusion} = useSearch();

  useEffect(() => {
    // converted to async to avoid occupying the callstack while performing the search.
    const handleSearch = async () => {
      if (users) {
        let searchResult = users;

        let cacheKey = getCacheKey(debouncedTerm, inclusionType, includedPermissions, excludedPermissions);

        let cachedResult = lruCache.get(cacheKey);

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

          lruCache.put(cacheKey, searchResult);
        }

        setCurrentUsers(searchResult);
      }
    };

    handleSearch();
  }, [users, debouncedTerm, inclusionType, includedPermissions, excludedPermissions]);

  useEffect(() => {
    return () => lruCache.clear();
  }, []);

  const getCacheKey = useCallback((
      term: string,
      inclusionType: string,
      includedPermissions: string[],
      excludedPermissions: string[]
    ) => {
      return `${term}-${inclusionType}-${includedPermissions.sort().join(',')}-${excludedPermissions.sort().join(',')}`;
    }
  , []);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={"Error fetching the users list"} />;
  if (currentUsers.length === 0) return <EmptyList />;

  return (
    <ul className={'grid gap-2 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'}>
      {currentUsers.map((user: any, index) => (
        <UsersListItem user={user} key={index}/>
      ))}
    </ul>
  );
};

export default UsersList;
