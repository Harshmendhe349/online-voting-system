import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const PhoneSignin = () => {
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState('');
    const { setUpRecaptcha } = useUserAuth();
    const navigate = useNavigate();
  
    const getOtp = async (e) => {
      e.preventDefault();
      setError('');
      if (number === '' || number === undefined) {
        return setError('Please enter a valid phone number!');
      }
      try {
        const response = await setUpRecaptcha(number);
        console.log(response);
        setConfirmObj(response);
        setFlag(true);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const verifyOtp = async (e) => {
      e.preventDefault();
      if (otp === '' || otp === undefined) {
        return setError('Please enter a valid OTP!');
      }
      try {
        setError('');
        await confirmObj.confirm(otp);
        navigate('/home');
      } catch (error) {
        setError(error.message);
      }
    };
  
    const containerStyle = {
      display: !flag ? 'block' : 'none',
    };
  
    const otpFormStyle = {
      display: flag ? 'block' : 'none',
    };
  
    return (
      <>
        <div className='p-4 box' style={{width:"500px", padding:"20px"}}>
          <h2 className='mb-3' >Phone Signin</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={getOtp} style={containerStyle}>
            <Form.Group className='mb-3' controlId='formBasicPhoneNumber'>
              <PhoneInput
                defaultCountry='PH'
                value={number}
                onChange={setNumber}
                placeholder='Enter phone number'
                style={{width:"400px", padding:"30px 10px"}}
              />
              <div id='recaptcha-container' />
            </Form.Group>
            <div className='button-right' >
              <Link to='/' style={{paddingRight:"10px"}}>
                <Button variant='secondary'style={{width:"100px"}}>Cancel</Button>&nbsp;
              </Link>
              <Button variant='primary' type='submit'>
                Send OTP
              </Button>
            </div>
          </Form>
  
          <Form onSubmit={verifyOtp} style={otpFormStyle}>
            <Form.Group className='mb-3' controlId='formBasicotp'>
              <Form.Control
                type='otp'
                placeholder='Enter OTP'
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div className='button-right'>
              <Link to='/'>
                <Button variant='secondary'>Cancel</Button>&nbsp;
              </Link>
              <Button variant='primary' type='submit'>
                Verify OTP
              </Button>
            </div>
          </Form>
        </div>
      </>
    );
  };
  
  export default PhoneSignin;
  