import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import TodoList from './components/TodoList';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<TodoList />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
};

export default App;
