import React, { useState } from 'react'
import { Col, Form, Input, Row, TimePicker, Dropdown, Menu, message } from 'antd';
import { Container } from 'react-bootstrap';
import { DownOutlined } from '@ant-design/icons';
import axiosInstance from '../common/AxiosInstance';

const items = [
   {
      label: 'A+',
      key: '1',
   },
   {
      label: 'A-',
      key: '2',
   },
   {
      label: 'AB-',
      key: '3',
   },
   {
      label: 'AB+',
      key: '4',
   },
   {
      label: 'B-',
      key: '5',
   }
];

const DonateForm = () => {

   const [details, setDetails] = useState({
      fullName: '',
      phone: '',
      address: '',
      bloodGroup: '',
      timings: '',
      minorHealthIssue: '',
      quantity: ''
   });

   const handleChange = (e) => {
      setDetails({ ...details, [e.target.name]: e.target.value })
   }
   const handleTimingChange = (timings) => {
      setDetails({ ...details, timings });
   };

   const handleBloodTypeSelect = (type) => {
      setDetails({
         ...details,
         bloodGroup: type,
      });
   };


   const handleSubmit = async () => {
      try {
         const res = await axiosInstance.post('/api/user/requestfordonate', details, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         })

         if (res.data.success) {
            message.success(res.data.message)
         }
         else {
            message.error(res.data.message)
         }
      } catch (error) {
         console.log(error)
      }

   }

   return (
      <Container>
         <h2 className='text-center p-3'>Applying for Plasma Donation</h2>
         <Form onFinish={handleSubmit} className='m-3' style={{ border: '1px solid lightgrey', padding: '20px', borderRadius: '15px' }}>
            <h4>Personal Details:</h4>
            <Row gutter={20} className='mt-4'>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Full Name" required>
                     <Input name='fullName' value={details.fullName} onChange={handleChange} placeholder='Enter name' />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Phone" required>
                     <Input value={details.phone} onChange={handleChange} name='phone' type='number' placeholder='Your phone' />
                  </Form.Item>
               </Col>


               <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Address" required>
                     <Input value={details.address} onChange={handleChange} name='address' type='text' placeholder='Your address' />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Blood Type" required>
                     <Dropdown
                        overlay={
                           <Menu>
                              {items.map((item) => (
                                 <Menu.Item
                                    key={item.key}
                                    onClick={() => handleBloodTypeSelect(item.label)}
                                 >
                                    {item.label}
                                 </Menu.Item>
                              ))}
                           </Menu>
                        }
                        trigger={['click']}
                     >
                        <span className="ant-dropdown-link">
                           {details.bloodGroup || ''} <DownOutlined />
                        </span>
                     </Dropdown>
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Quantity" required>
                     <Input value={details.quantity} onChange={handleChange} name='quantity' type='number' placeholder='quantity(in ml)' />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Timings" name="timings" required>
                     <TimePicker.RangePicker format="HH:mm" onChange={handleTimingChange} />
                  </Form.Item>
               </Col>
            </Row>
            <h4>Other Details:</h4>
            <Row gutter={20}>
               <Col xs={12} md={12} lg={8}>
                  <Form.Item label="Minor Health Problem" required>
                     <Input value={details.minorHealthIssue} onChange={handleChange} type='text' name='minorHealthIssue' placeholder='enter minor health issue' />
                  </Form.Item>
               </Col>


            </Row>
            <div className="d-flex justify-content-center mt-4">
               <button className="btn btn-primary" type="submit">Submit</button>
            </div>
         </Form>
      </Container>
   )
}

export default DonateForm
