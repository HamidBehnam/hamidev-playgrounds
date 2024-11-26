import React, { FC, ReactNode } from "react";
import { Permission } from "../../types";

interface UserAvatarProps {
  permission: Permission
}

const UserAvatar: FC<UserAvatarProps> = ({permission}) => {
  let icon: ReactNode;

  switch (permission) {
    case Permission.Manage:
      icon = <div>ManageIcon</div>
      break;
    case Permission.View:
      icon = <div>ViewIcon</div>
      break;
    case Permission.Suspended:
      icon = <div>SuspendedIcon</div>
      break;
    default:
      return null;
  }

  return (
    <div>
      {icon}
    </div>
  );
};

export default UserAvatar;
