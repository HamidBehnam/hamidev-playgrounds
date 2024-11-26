import React, {useState, useEffect} from "react";
import { useQuery } from "@tanstack/react-query";
import useUsersApi from "../../hooks/useUsersApi";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { useAppContext } from "../../providers/AppProvider";
import useDebounce from "../../hooks/useDebounce";
import useSearch from "../../hooks/useSearch";
import UsersListItem from "../UsersListItem/UsersListItem";


const UsersList = () => {
  const { getUsers } = useUsersApi();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });
  const [currentUsers, setCurrentUsers] = useState([]);
  const {state: {filterData: {term, inclusionType, includedPermissions, excludedPermissions}, userIntervened}} = useAppContext();
  const debouncedTerm = useDebounce(term, userIntervened ? 500 : 0);
  const {searchByText, searchByPermissionInclusion, searchByPermissionExclusion} = useSearch();

  useEffect(() => {
    if (users) {
      let searchResult = users;

      if (debouncedTerm.trim()) {
        searchResult = searchByText(searchResult, debouncedTerm);
      }

      if (inclusionType === 'INCLUDE') {
        searchResult = searchByPermissionInclusion(searchResult, includedPermissions);
      } else if (inclusionType === 'EXCLUDE') {
        searchResult = searchByPermissionExclusion(searchResult, excludedPermissions);
      }

      setCurrentUsers(searchResult);
    }
  }, [users, debouncedTerm, inclusionType, includedPermissions, excludedPermissions]);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={"Error fetching the users list"} />;

  return (
    <ul className={'grid gap-2 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'}>
      {currentUsers.map((user: any, index) => (
        <UsersListItem user={user}/>
      ))}
    </ul>
  );
};

export default UsersList;
