import React, { useState, useEffect } from 'react'
import { styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses } from '@mui/material'
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
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

const UserHome = () => {

   const [allDonationRequest, setDonationRequest] = useState([])

   const allRequest = async () => {
      try {
         const res = await axiosInstance.get('api/user/getallrequest', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         })
         if (res.data.success) {
            setDonationRequest(res.data.data)
         }
         else {
            alert(res.data.message)
         }
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      allRequest()
   }, [])

   const modifiedTime = (timings) => {
      const modifiedTimings = timings.map((time, index, array) => {
         // Check if the current index is not the last one
         if (index < array.length - 1) {
            return `${time} - ${array[index + 1]}`;
         }
      });
      return(modifiedTimings) // Return the last time without a dash
   }
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
               <TableRow>
                  <StyledTableCell>Request ID</StyledTableCell>
                  <StyledTableCell align="left">Blood Group</StyledTableCell>
                  <StyledTableCell align="left">Date and Time of donation(from-to)</StyledTableCell>
                  <StyledTableCell align="left">Doctor Alloted</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {
                  allDonationRequest?.length > 0 ? (
                     allDonationRequest?.map((Request) => (
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
                              {Request.doctorAlloted !== "" ? Request?.doctorAlloted : 'none'}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              {Request.status}
                           </StyledTableCell>

                        </StyledTableRow>
                     )))
                     :
                     (<p className='px-2'>No request for donation</p>)
               }
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default UserHome
