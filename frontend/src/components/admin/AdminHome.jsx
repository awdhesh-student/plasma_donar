import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses } from '@mui/material';
import axiosInstance from '../common/AxiosInstance';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

const AdminHome = () => {
   const [allRequestDonation, setAllRequestDonation] = useState([]);

   const allRequest = async () => {
      try {
         const res = await axiosInstance.get('/api/admin/getallrequest', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });
         if (res.data.data) {
            setAllRequestDonation(res.data.data);
         } else {
            message.error(res.data.message);
         }
      } catch (error) {
         console.error('Error fetching requests:', error);
         message.error('An error occurred while fetching requests');
      }
   };

   useEffect(() => {
      allRequest();
   }, []);

   const modifiedTime = (timings) => {
      const modifiedTimings = timings.map((time, index, array) => {
         if (index < array.length - 1) {
            return `${time} - ${array[index + 1]}`;
         }
      });
      return modifiedTimings;
   };



   const changeStatus = async (requestID, status) => {
      try {
         const res = await axiosInstance.post(`/api/admin/allotdoc/${requestID}`, {
            status
         }, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });

         if (res.data.success) {
            message.success(res.data.message)
            allRequest()
         }
         else {
            message.error(res.data.message)
         }
      } catch (error) {
         console.log(error)
      }
   };

   return (
      <>


         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Request ID</StyledTableCell>
                     <StyledTableCell align="left">Blood Group</StyledTableCell>
                     <StyledTableCell align="left">Date and Time of donation(from-to)</StyledTableCell>
                     <StyledTableCell align="left">Quantity(in ml)</StyledTableCell>
                     <StyledTableCell align="left">Status</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {
                     allRequestDonation?.length > 0 ? (
                        allRequestDonation?.map((Request) => (
                           <StyledTableRow key={Request._id}>
                              <StyledTableCell component="th" scope="row">
                                 {Request._id}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                 {Request.bloodGroup}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                 {modifiedTime(Request.timings)}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                 {Request.quantity}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                 <Button onClick={() => changeStatus(Request._id, "Booked")}>
                                    {Request.status}
                                 </Button>
                                 {/* {selectedRequest && selectedRequest._id === Request._id &&
                                    <Modal show={showModal} onHide={handleCloseModal}>
                                       <Modal.Header closeButton>
                                          <Modal.Title>Alloting Doctor</Modal.Title>
                                       </Modal.Header>
                                       <Modal.Body>
                                          <Form onSubmit={() => changeStatus(Request._id, "Alloted")}>
                                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <DoctorSelectionDropdown selectedDoctor={selectedDoctor} />
                                             </Form.Group>
                                             <Button variant="primary" type='submit'>
                                                Save Changes
                                             </Button>
                                          </Form>
                                       </Modal.Body>
                                    </Modal>
                                 } */}
                              </StyledTableCell>
                           </StyledTableRow>
                        )))
                        :
                        (<TableRow>
                           <TableCell colSpan={5} align="center">No request for donation</TableCell>
                        </TableRow>)
                  }
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
};

export default AdminHome;
