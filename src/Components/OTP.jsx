import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Otp() {
  const [otpValue, setOtpValue] = useState('');
  const [Otpinfo, setOtpinfo] = useState({
    Email: localStorage.getItem('email') || '',
    VerifyCode: '',
  });
  const [error400, seterror400] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    if (value.length >= 1 && index < 5) {
      document.getElementById(`input${index + 2}`).focus();
    }

    if (value.length === 0 && index > 0) {
      document.getElementById(`input${index}`).focus();
    }

    let newOtpValue = otpValue.substring(0, index) + value + otpValue.substring(index + 1);
    setOtpValue(newOtpValue);

    setOtpinfo(prevInfo => ({
      ...prevInfo,
      VerifyCode: newOtpValue
    }));
  };

  console.log(Otpinfo)

  const checkOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://testone2023-001-site1.htempurl.com/API%20for%20Notes/OTP.php", JSON.stringify(Otpinfo));
      if (response.data.Code === 200) {
        localStorage.clear();
        navigate("/Login");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      seterror400(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      padding: '25px',
    }}>
      {error400 && (
        <div className="alert alert-danger mt-3" role="alert">
          {error400}
        </div>
      )}
      <form className="form w-100" onSubmit={checkOTP}>
        <div className="title">OTP Verification Code</div>
        <p className="message">We have sent a verification code to your email</p>
        <div className="inputs">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <input
              key={index}
              id={`input${index}`}
              type="text"
              maxLength="1"
              onChange={(e) => handleInputChange(index - 1, e)}
            />
          ))}
        </div>
        <button className="action mt-3" type='submit'>Verify Me</button>
      </form>
    </div>
  );
}
