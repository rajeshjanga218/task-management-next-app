import {
  ADD_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  FETCH_TASK_FAILURE,
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "./constants/actionTypes";
import { TaskState, TasksActionTypes } from "./constants/types";

// Initial state
const initialState: TaskState = {
  loading: false,
  tasks: [],
  task: null,
  error: null,
};

// Task reducer
const taskReducer = (
  state: TaskState = initialState,
  action: TasksActionTypes | any
): TaskState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
        error: null,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                completed: action.payload.completed,
                description: action.payload.description,
                duedate: action.payload.duedate,
                title: action.payload.title,
              }
            : task
        ),
        error: null,
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(
          (deletedTask) => deletedTask.id !== action.payload.id
        ),
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    case FETCH_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
