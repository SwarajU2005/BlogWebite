import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import LogoImage from '../Images/image.png';

const Login = () => {
  const url = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  const [account , toggleaccount] = useState('login');

  const toggleSignup = () => {
    account==='login'?
    toggleaccount('signup')
    :
    toggleaccount('login')
  }


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

        {
          account === 'login' ?

          <Box className="px-6 py-4">
            <TextField variant="standard" label="Username" fullWidth 
              sx={{ mb: 2 }}  // Spacing using MUI sx prop
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
            />
            <TextField variant="standard" label="Password" type="password" fullWidth 
              sx={{ mb: 4 }}  // Spacing using MUI sx prop
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
            />
            <Button variant="contained" fullWidth color="primary" 
              sx={{ mb: 2 }}
              style={{ fontSize: '16px', backgroundColor:'#001f3f'}}
            >
              Login
            </Button>
            <Typography sx={{ textAlign:'center'}}>OR</Typography>
            <Button fullWidth variant="text" color="secondary" 
              sx={{ fontSize: '14px', color:'#001f3f' }}
              onClick={()=> toggleSignup()}
              
            >
              Create an account
            </Button>
          </Box>


        :




          <Box className="px-6 py-4">
            <TextField variant="standard" label="Name" fullWidth 
              sx={{ mb: 2 }}  // Spacing using MUI sx prop
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
            />
            <TextField variant="standard" label="Username" fullWidth 
              sx={{ mb: 2 }}  // Spacing using MUI sx prop
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
            />
            <TextField variant="standard" label="Password" type="password" fullWidth 
              sx={{ mb: 4 }}  // Spacing using MUI sx prop
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
            />
            <Button variant="contained" fullWidth color="primary" 
              sx={{ mb: 2 }}
              style={{ fontSize: '16px',backgroundColor:'#001f3f'}}
            >
              Sign Up
            </Button>
            <Typography sx={{ textAlign:'center'}}>OR</Typography>
            <Button fullWidth variant="text" color="secondary" 
              sx={{ fontSize: '14px' , color:'#001f3f'}}
              onClick={()=> toggleSignup()}
            >
              Already have an account
            </Button>
          </Box>

        }

      </Box>
    </Box>
  );
};

export default Login;
