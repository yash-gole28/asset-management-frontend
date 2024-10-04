import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiList } from '../apiList';
import { API } from '../network';
import Switch from '@mui/material/Switch';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    department: string;
    role: string;
    email: string;
    active: boolean;
}

const UsersTable = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getUserData = async () => {
        setLoading(true);
        try {
            const url = apiList.getAllUsers;
            const response = await API.get(url);
            if (response.data.success) {
                setUserData(response.data.users);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const changeActive = async (id: string) => {
        setLoading(true); // Set loading state
        try {
            const url = apiList.changeActiveUser;
            const response = await API.put(url, { id });
            if (response?.data.success) {  // Corrected typo from 'sucess' to 'success'
                await getUserData(); // Fetch updated user data
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error changing active status:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <TableContainer sx={{
            borderRadius: "4px",
            backgroundColor: "white",
            boxShadow: '0 0 3px rgb(198, 200, 205)',
            marginBottom: "10px",
            position: "relative",
            padding: { xs: '0px', sm: '0px 10px', md: '0px 15px' },

        }}>
            {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}

            <Table sx={{ width: '100%' }} size='small' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap', color: '#495057' }} align="left">Sr. No</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap', color: '#495057' }} align="left">Employee Name</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap', color: '#495057' }} align="left">Email</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap', color: '#495057' }} align="left">Role</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap', color: '#495057' }} align="left">Active</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap', color: '#495057' }} align="left">Change Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
                        <TableRow key={v._id}>
                            <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{v.firstName} {v.lastName}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{v.email}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{v.role}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="center">{v.active ?
                                <Typography sx={{ fontSize: '13px', backgroundColor: 'rgb(218, 244, 235)', color: 'rgb(26, 204, 141)', width: 'fit-content', padding: '1px 10px', borderRadius: '5px' }}>Yes</Typography> :
                                <Typography sx={{ fontSize: '13px', backgroundColor: 'rgb(253, 228, 228)', color: 'rgb(247, 106, 106)', width: 'fit-content', padding: '1px 10px', borderRadius: '5px' }}>No</Typography>}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap' }} align="left">

                                {/* <Switch
                                    size='small'
                                    checked={v.active}
                                    onChange={() => changeActive(v._id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                /> */}
                                 <Switch
                      size='small'
                      checked={v.active}
                      onChange={() => changeActive(v._id)}
                      inputProps={{ 'aria-label': 'ant design' }}
                      sx={{
                        '&.MuiSwitch-root': {
                          // Custom styles for iOS switch
                          width:'35px',
                          height:'20px',
                          padding: 0,
                          borderRadius: 26 / 2,
                          
                        },
                        '& .MuiSwitch-thumb': {
                          width: "11px",
                          height: "11px",
                          backgroundColor: v.active ? '#4caf50' : '#f44336',
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: v.active ? '#a5d6a7' : '#ef9a9a', 
                        },
                        '&.Mui-checked': {
                          transform: 'translateX(18px)', 
                        },
                      }}
                    />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 15, 25]}
                component="div"
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default UsersTable;
