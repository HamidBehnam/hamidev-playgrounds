import React, { FC } from 'react';
import { ListItem, ListItemText, Typography } from "@mui/material";
import UserAvatar from '../UserAvatar/UserAvatar';
import UserTooltip from '../UserTooltip/UserTooltip';
import UserTooltipContent from '../UserTooltipContent/UserTooltipContent';

interface UsersListItemProps {
    user: any
}

const UsersListItem: FC<UsersListItemProps> = ({user}) => {
    return (
        <UserTooltip title={<UserTooltipContent user={user}/>} followCursor>
            <ListItem 
                alignItems="flex-start"
                sx={{
                    '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                    transition: 'background-color 0.3s ease',
                    padding: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: 'pointer'
                }}
            >
                <UserAvatar permission={user.permission} />
                <ListItemText
                    primary={user.name}
                    secondary={
                    <React.Fragment>
                        <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                        >
                        {user.email}
                        </Typography>
                    </React.Fragment>
                    }
                />
            </ListItem>
      </UserTooltip>
    );
};

export default UsersListItem;