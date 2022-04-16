import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { instance, user } from '../api';
import Form from './Atom/Form';

const SignIn = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    id: '',
    password: '',
  });

  const onChange = ({ target: { id, value } }: { target: { id: string; value: string } }) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  const { mutate } = useMutation(() => user.signin(inputValues), {
    onSuccess: data => {
      localStorage.setItem('accessToken', data.accessToken);
      instance.defaults.headers.common['Authorization'] = `${localStorage.getItem('accessToken')}`;
      navigate('/');
    },
  });

  return (
    <Form>
      <Typography variant='h4' component='h2'>
        로그인
      </Typography>
      <TextField
        id='id'
        fullWidth
        label='ID'
        size='small'
        variant='filled'
        onChange={onChange}
        sx={{ mt: 5 }}
        style={{ borderRadius: '7px', backgroundColor: 'white' }}
      />
      <TextField
        id='password'
        type='password'
        fullWidth
        label='Password'
        size='small'
        variant='filled'
        onChange={onChange}
        sx={{ mt: 3 }}
        style={{ borderRadius: '7px', backgroundColor: 'white' }}
      />
      <Button variant='contained' fullWidth sx={{ mt: 5, mb: 3 }} onClick={() => mutate()}>
        로그인
      </Button>
      <Button variant='outlined' fullWidth onClick={() => navigate('/signup')}>
        회원가입
      </Button>
    </Form>
  );
};

export default SignIn;
