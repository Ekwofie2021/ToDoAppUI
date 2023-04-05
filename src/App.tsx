import { Container, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { todoApi } from './features/store';
import { AddTodo } from './AddTodo';
import ToggleButton from '@mui/material/ToggleButton';
import { useCallback } from 'react';
import { Todo } from './features/todo';
import CheckIcon from '@mui/icons-material/Check';


function App() {
  
  const [updateTodoStatus, error] = todoApi.useUpdateTodoStatusMutation();
  const updateTodo = useCallback((todo:Todo) => updateTodoStatus({...todo}), [updateTodoStatus]);

  const setSelected = (todo: Todo) => {
      updateTodo({...todo, isCompleted: !todo.isCompleted});
   };

  const {data: todos} = todoApi.useGetAllQuery(); 

  return (
    <Container maxWidth="sm">    
      <div>
        <h2>Todo App</h2>
        <AddTodo/>
      </div>

      <TableHead>
        <TableRow/>
        <TableCell> Title </TableCell>
        <TableCell> Description </TableCell>
        <TableCell> Status </TableCell>
        <TableCell> Action </TableCell>
        <TableRow />
      </TableHead>

      <TableBody>  
        {todos?.map((todo) =>(              
        <TableRow key={todo.id}>
          <TableCell>{todo.title}</TableCell>
          <TableCell>{todo.description}</TableCell>
          <TableCell>{todo.isCompleted === true ? "Completed" : "Pending"}</TableCell>
          <TableCell>

          <ToggleButton value="check"  onChange={() => {setSelected(todo); }}> 
            <CheckIcon/>
          </ToggleButton>
          </TableCell>
        </TableRow> 
        ))}  
      </TableBody>
      
      </Container>
  );
}

export default App;
