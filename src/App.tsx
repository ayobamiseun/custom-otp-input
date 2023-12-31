
import './App.css'
import OTPInput from './components/Otp'
import CountDown from './components/CountDown'

function App() {
  const handleOTPComplete = (otp: string) => {
    console.log('OTP Entered:', otp);
  };


  return (
    <>

     <OTPInput
        size={6} // Specify the number of input fields (e.g., 6 for a 6-digit OTP)
        inputStyle={{ // Customize input field styles
          width: '50px',
          height: '50px',
          border: '2px solid #000',
          borderRadius: '5px',
          fontSize: '20px',
        }}
        onComplete={handleOTPComplete} // Callback function when OTP is complete
        containerStyle={{ // Customize the container div styles
          margin: '20px',
        }}
        width="350px" // Customize the width of the OTP input container
        height="60px" // Customize the height of the OTP input fields
      />
      <CountDown initialTimeInSeconds={30} name="will expire" />
    </>
  )
}

export default App
