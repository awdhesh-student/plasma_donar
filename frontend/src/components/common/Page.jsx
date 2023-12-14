import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';

import AdminHome from '../admin/AdminHome';
import UserHome from '../user/UserHome';

const Page = () => {
   const user = useContext(UserContext);
   let content;
   {
      switch (user.userData.type) {
         case "User":
            content = <UserHome />
            break;
         case "Admin":
            content = <AdminHome />
            break;
         default:
            break;
      }
   }

   return (
      <Container>
         {content}
      </Container>
   );
};

export default Page;
