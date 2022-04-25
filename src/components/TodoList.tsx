import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { todo } from '../api';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState('');
  const { data } = useQuery('todo', todo.load);
  const [todos, setTodos] = useState(data);

  const navigate = useNavigate();
  const isToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isToken) {
      navigate('/signin');
    }
  }, [isToken, navigate]);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const onChange = ({ target: { value } }: { target: { value: string } }) => {
    setInputValue(value);
  };

  const { mutate } = useMutation(() => todo.create(inputValue), {
    onSuccess: () => {
      queryClient.invalidateQueries('todo');
      setInputValue('');
    },
  });

  const { mutate: changeMutate } = useMutation((data: { from: number; to: number }) =>
    todo.changeOrder(data)
  );

  const { mutate: toggleComplete } = useMutation(
    (data: { id: number; isComplete: boolean }) => todo.toggleComplete(data.id, !data.isComplete),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todo');
      },
    }
  );

  const { mutate: deleteTodo } = useMutation((id: number) => todo.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('todo');
    },
  });

  const handleChange = (result: any) => {
    if (!result.destination) return;
    if (todos) {
      const items = [...todos];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setTodos(items);
    }
    changeMutate({ from: result.source.index + 1, to: result.destination.index + 1 });
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <TextField
            label='할 일 입력'
            variant='filled'
            fullWidth
            size='small'
            value={inputValue}
            onChange={onChange}
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: '7px',
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                mutate();
              }
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant='contained'
            fullWidth
            size='large'
            onClick={() => mutate()}
            style={{
              height: '100%',
              borderRadius: '0px',
              borderTopRightRadius: '7px',
            }}
          >
            추가
          </Button>
        </Grid>
      </Grid>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId='todos'>
          {provided => (
            <List
              sx={{
                maxHeight: 400,
                overflowY: 'scroll',
                bgcolor: '#121212',
                color: '#fff',
              }}
              style={{ borderBottomLeftRadius: '10px' }}
              className='todos'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos?.map((todo, index) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                  {provided => (
                    <ListItem
                      key={index}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      secondaryAction={
                        <IconButton onClick={() => deleteTodo(todo.id)}>
                          <DeleteIcon style={{ color: '#fff' }} />
                        </IconButton>
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Checkbox
                            checked={todo.isComplete}
                            onChange={() =>
                              toggleComplete({ id: todo.id, isComplete: todo.isComplete })
                            }
                            style={{ color: '#fff', backgroundColor: '#121212' }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={todo.content} />
                      </ListItemButton>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default TodoList;
