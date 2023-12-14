import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import Page from "./Page"
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import DonateForm from '../user/DonateForm';


const Dashboard = () => {
   const user = useContext(UserContext)
   const [selectedComponent, setSelectedComponent] = useState('home');

   const renderSelectedComponent = () => {
      switch (selectedComponent) {
         case 'home':
            return <Page />
         case 'donate':
            return <DonateForm />
         default:
            return <Page />

      }
   };
   return (
      <>
         <NavBar setSelectedComponent={setSelectedComponent} />
         <Container className='my-3'>
            {renderSelectedComponent()}
         </Container>
      </>
   );
};

export default Dashboard;


