import React, { FC, ReactNode } from "react";
import { Permission } from "../../types";
import BlockIcon from '@mui/icons-material/Block';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, ListItemAvatar, ListItemIcon } from "@mui/material";

interface UserAvatarProps {
    permission: Permission
}

const UserAvatar: FC<UserAvatarProps> = ({permission}) => {
    let icon: ReactNode;

    switch (permission) {
        case Permission.Manage:
            icon = <ManageAccountsIcon color="primary" fontSize="large"/>
            break;
        case Permission.View:
            icon = <VisibilityIcon color="primary" fontSize="large"/>
            break;
        case Permission.Suspended:
            icon = <BlockIcon color="primary" fontSize="large"/>
            break;
        default:
            return null;
    }

    return (
        <ListItemIcon>
            {icon}
        </ListItemIcon>
    );
};

export default UserAvatar;