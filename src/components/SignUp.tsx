import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { user } from '../api';

const SignUp = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    id: '',
    password: '',
  });

  const onChange = ({ target: { id, value } }: { target: { id: string; value: string } }) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  const { mutate } = useMutation(() => user.signup(inputValues), {
    onSuccess: () => {
      alert('회원가입 완료');
      navigate('/signin');
    },
    onError: error => {
      console.log(inputValues)
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    },
  });

  return (
    <div>
      <Typography variant='h4' component='h2'>
        회원가입
      </Typography>
      <TextField
        id='id'
        type='text'
        fullWidth
        size='small'
        label='ID'
        variant='filled'
        onChange={onChange}
        sx={{ mt: 5 }}
        style={{ borderRadius: '7px', backgroundColor: 'white' }}
      />
      <TextField
        id='password'
        type='password'
        fullWidth
        size='small'
        label='Password'
        variant='filled'
        onChange={onChange}
        sx={{ mt: 3 }}
        style={{ borderRadius: '7px', backgroundColor: 'white' }}
      />
      <Button variant='contained' fullWidth sx={{ mt: 5, mb: 3 }} onClick={() => mutate()}>
        회원가입
      </Button>
      <Button variant='outlined' fullWidth onClick={() => navigate('/signin')}>
        취소
      </Button>
    </div>
  );
};

export default SignUp;

const Form = styled.div`
  padding: 20px;
`