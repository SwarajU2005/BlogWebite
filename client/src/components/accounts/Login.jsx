import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import LogoImage from '../Images/image.png';
import { API } from '../../service/api.js';

const loginInitialValues = {
  username: '',
  password: ''
}

const signupInitialValues = {
  name: '',
  username: '',
  password: ''
};

const Login = () => {
  const [account, toggleaccount] = useState('login'); // State for login/signup toggle
  const [signup, setSignup] = useState(signupInitialValues); // State for signup form fields
  const [login, setLogin] = useState(loginInitialValues); // State for signup form fields
  const [error, setError] = useState('') ; 
  // Toggle between login and signup form
  const toggleSignup = () => {
    account === 'login' ? toggleaccount('signup') : toggleaccount('login');
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
        const response = await API.userSignup(signup);
        console.log('Signup Response:', response);
        if(response.isSuccess){
          setError('');
          setSignup(signupInitialValues);
          toggleaccount('login');
        }else{
          setError('something went wrong . try agai later')
        }
    } catch (error) {
        console.error('Signup Error:', error);
    }
};


const onValueChange = (e) => {
  setLogin({...login,[e.target.name]: e.target.value})
} 

const loginUser = async () => {
  try {
      const response = await API.userLogin(login); // API call
      if (response?.isSuccess) { // Optional chaining to handle undefined response
          setError(''); // Clear error if successful
      } else {
          setError('Something went wrong. Please try again later.'); // Handle unsuccessful login
      }
  } catch (error) {
      // Handle exceptions from API call
      setError(`Error: ${error.message || 'An unexpected error occurred'}`);
      console.error("Login Error:", error); // Log detailed error for debugging
  }
};


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 100% of the viewport height
        backgroundColor: '#f5f5f5', // Optional: background color for the page
      }}
    >
      <Box className="w-full max-w-md py-8 shadow-lg rounded-lg bg-white">
        <Box className="text-center mb-6">
          <img src={LogoImage} alt="logo" className="w-64 mx-auto mb-4" />
        </Box>

        {account === 'login' ? (
          // Login Form
          <Box className="px-6 py-4">
            <TextField
              variant="standard"
              label="Username"
              name="username"
              value={login.username || ''}
              onChange={(e)=> onValueChange(e)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                style: { fontSize: '16px' },
              }}
            />
            <TextField
              variant="standard"
              label="Password"
              name="password"
              value={login.password || ''}
              onChange={(e)=> onValueChange(e)}
              type="password"
              fullWidth
              sx={{ mb: 4 }}
              InputProps={{
                style: { fontSize: '16px' },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mb: 2 }}
              style={{ fontSize: '16px', backgroundColor: '#001f3f' }}
              onClick={() => loginUser()}
            >
              Login
            </Button>
            <Typography sx={{ textAlign: 'center' }}>OR</Typography>
            <Button
              fullWidth
              variant="text"
              color="secondary"
              sx={{ fontSize: '14px', color: '#001f3f' }}
              onClick={toggleSignup} // Switch to signup
            >
              Create an account
            </Button>
          </Box>
        ) : (
          // Signup Form
          <Box className="px-6 py-4">
            <TextField
              variant="standard"
              label="Name"
              name="name"
              value={signup.name || ''}
              onChange={(e)=> onInputChange(e)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                style: { fontSize: '16px' },
              }}
            />
            <TextField
              variant="standard"
              label="Username"
              name="username"
              value={signup.username || ''}
              onChange={(e)=> onInputChange(e)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                style: { fontSize: '16px' },
              }}
            />
            <TextField
              variant="standard"
              label="Password"
              name="password"
              value={signup.password || ''}
              onChange={(e)=> onInputChange(e)}
              type="password"
              fullWidth
              sx={{ mb: 4 }}
              InputProps={{
                style: { fontSize: '16px' },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mb: 2 }}
              style={{ fontSize: '16px', backgroundColor: '#001f3f' }}
              onClick={signupUser} // Handle signup
            >

              Sign Up
            </Button>
            <Typography sx={{ textAlign: 'center' }}>OR</Typography>
            <Button
              fullWidth
              variant="text"
              color="secondary"
              sx={{ fontSize: '14px', color: '#001f3f' }}
              onClick={toggleSignup} // Switch to login
            >
              Already have an account
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
