import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import TodoList from './components/TodoList';
import { useEffect } from 'react';
import SignUp from './components/SignUp';
import { Container } from '@mui/material';

const App = () => {
  const navigate = useNavigate();
  const isToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isToken) {
      navigate('/signin');
    }
  }, [isToken]);

  return (
    <Container
      maxWidth='xs'
      sx={{ backgroundColor: '#1a2027', mt: 10, p: 3 }}
      style={{ borderRadius: '10px' }}
    >
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Container>
  );
};

export default App;
