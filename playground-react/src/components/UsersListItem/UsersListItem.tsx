import React, { FC } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';

interface UsersListItemProps {
  user: any
}

const UsersListItem: FC<UsersListItemProps> = ({user}) => {
  return (
    <li>
      <UserAvatar permission={user.permission} />
      <div>{user.name}</div>
      <div>{user.email}</div>
    </li>
  );
};

export default UsersListItem;
