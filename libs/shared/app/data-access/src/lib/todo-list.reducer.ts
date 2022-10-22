import { Task } from '@frontend-challenge/shared/util/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import * as TodoListActions from './todo-list.actions';

export const todoListFeatureKey = 'todoList';

export interface State {
  taskList: Task[];
  isLoading: boolean;
}

export const initialState: State = {
  taskList: [],
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(TodoListActions.loadTodoList, (state) => ({
    ...state,
    isLoading: true
  })),
  on(TodoListActions.loadTodoListSuccess, (state, { tasks }) => ({
    ...state,
    taskList: tasks,
    isLoading: false
  })),
  on(TodoListActions.loadTodoListError, (state) => ({
    ...state,
    isLoading: false
  })),
  on(TodoListActions.createTodoList, (state) => ({ ...state, isLoading: true })),
  on(TodoListActions.createTodoListSuccess, (state, { task }) => ({
    ...state,
    taskList: [...state.taskList, task],
    isLoading: false
  })),
  on(TodoListActions.createTodoListError, (state) => ({
    ...state,
    isLoading: false
  })),
  on(TodoListActions.removeTodoList, (state) => ({ ...state, isLoading: true })),
  on(TodoListActions.removeTodoListSuccess, (state, { taskId }) => ({
    ...state,
    taskList: state.taskList.filter(({ id }) => id !== taskId),
    isLoading: false
  })),
  on(TodoListActions.removeTodoListError, (state) => ({
    ...state,
    isLoading: false
  })),
  on(TodoListActions.updateTodoList, (state) => ({ ...state, isLoading: true })),
  on(TodoListActions.updateTodoListSuccess, (state, { task }) => ({
    ...state,
    taskList: state.taskList.map((t) => (t.id === task.id ? task : t)),
    isLoading: false,
  })),
  on(TodoListActions.updateTodoListError, (state) => ({
    ...state,
    isLoading: false
  })),
);
