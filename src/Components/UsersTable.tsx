import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiList } from '../apiList';
import { API } from '../network';

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
            width: { xs: "100%", sm: "100%" },
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: 2,
            marginBottom: "10px",
            position: "relative",
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
                <TableHead sx={{ backgroundColor: 'rgb(177, 191, 238)' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap' }} align="center">Serial No</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap' }} align="center">Employee Name</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap' }} align="center">Email</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap' }} align="center">Role</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap' }} align="center">Active</TableCell>
                        <TableCell sx={{ fontWeight: '600', textWrap: 'nowrap' }} align="center">Change Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
                        <TableRow key={v._id}>
                            <TableCell sx={{ textWrap: 'nowrap' }} align="center">{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.firstName} {v.lastName}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.email}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.role}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.active ? "Yes" : "No"}</TableCell>
                            <TableCell sx={{ textWrap: 'nowrap' }} align="center">
                                <Button size='small' onClick={() => changeActive(v._id)} disabled={loading}>
                                    Change
                                </Button>
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
