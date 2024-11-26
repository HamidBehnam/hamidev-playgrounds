import React, { FC } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';

interface UsersListItemProps {
  user: any
}

const UsersListItem: FC<UsersListItemProps> = ({user}) => {
  return (
    <li className={'rounded p-10 flex items-center gap-1 shadow-md justify-between overflow-scroll hover:bg-gray-300 transition-all cursor-pointer'}>
      <UserAvatar permission={user.permission} />
      <section>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.company}</div>
        <div>{user.address}</div>
        <div>{user.phone}</div>
      </section>
    </li>
  );
};

export default UsersListItem;
