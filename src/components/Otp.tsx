import React, { useState, useRef, ChangeEvent } from 'react';

interface OTPInputProps {
  size: number;
  inputStyle?: React.CSSProperties;
  onComplete?: (otp: string) => void;
  containerStyle?: React.CSSProperties;
  width?: string;
  height?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  size,
  inputStyle,
  onComplete,
  containerStyle,
  width,
  height,
}) => {
  // Validate the size prop to be a positive integer
  if (!Number.isInteger(size) || size <= 0) {
    console.error('Invalid size for OTPInput. Must be a positive integer.');
    return null;
  }

  const [otp, setOTP] = useState<string[]>(Array(size).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>(new Array(size));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    // Update the OTP state
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to the next input field
    if (value && index < size - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete and trigger onComplete callback
    if (!newOTP.includes('') && onComplete) {
      onComplete(newOTP.join(''));
    }
  };

  // Custom styles for the container div
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    ...containerStyle,
  };

  // Custom styles for each input field
  const inputStyles: React.CSSProperties = {
    width: width || '40px', // Customizable width, with a default value of '40px'
    height: height || '40px', // Customizable height, with a default value of '40px'
    marginRight: '5px', // Customize spacing between inputs
    border: '1px solid #ccc', // Customize border
    ...inputStyle,
  };

  // Render the input fields based on the size prop and apply styles
  const inputFields = [];
  for (let i = 0; i < size; i++) {
    inputFields.push(
      <input
        key={i}
        type="text"
        value={otp[i]}
        onChange={(e) => handleInputChange(e, i)}
        style={inputStyles}
        ref={(el) => (inputRefs.current[i] = el)}
      />
    );
  }

  return <div style={containerStyles}>{inputFields}</div>;
};

export default OTPInput;
