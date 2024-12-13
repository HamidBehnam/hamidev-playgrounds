import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface UserTooltipContentProps {
    user: any;
}

const UserTooltipContent: FC<UserTooltipContentProps> = ({user}) => {
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow
                            key={'1'}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {'Company'}
                            </TableCell>
                            <TableCell align="right">{user.company}</TableCell>
                        </TableRow>
                        <TableRow
                            key={'2'}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {'Address'}
                            </TableCell>
                            <TableCell align="right">{user.address}</TableCell>
                        </TableRow>
                        <TableRow
                            key={'3'}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {'Phone'}
                            </TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};

export default UserTooltipContent;