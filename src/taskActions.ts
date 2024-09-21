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
  TOGGLE_DARK_MODE,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "./constants/actionTypes";
import {
  AddTaskFailure,
  AddTaskRequest,
  AddTaskSuccess,
  DeleteTaskFailure,
  DeleteTaskRequest,
  DeleteTaskSuccess,
  FetchTaskFailure,
  FetchTaskRequest,
  FetchTasksFailure,
  FetchTasksRequest,
  FetchTasksSuccess,
  FetchTaskSuccess,
  Task,
  UpdateTaskFailure,
  UpdateTaskRequest,
  UpdateTaskSuccess,
} from "./constants/types";

export function fetchTasksRequest(): FetchTasksRequest {
  return { type: FETCH_TASKS_REQUEST };
}

export function fetchTasksSuccess(data: Task[]): FetchTasksSuccess {
  return { type: FETCH_TASKS_SUCCESS, payload: data };
}

export function fetchTasksFailure(error: string): FetchTasksFailure {
  return { type: FETCH_TASKS_FAILURE, payload: error };
}

export function addTaskRequest(): AddTaskRequest {
  return { type: ADD_TASK_REQUEST };
}

export function addTaskSuccess(data: Task): AddTaskSuccess {
  return { type: ADD_TASK_SUCCESS, payload: data };
}

export function addTaskFailure(error: string): AddTaskFailure {
  return { type: ADD_TASK_FAILURE, payload: error };
}

export function updateTaskRequest(): UpdateTaskRequest {
  return { type: UPDATE_TASK_REQUEST };
}

export function updateTaskSuccess(data: Task): UpdateTaskSuccess {
  return { type: UPDATE_TASK_SUCCESS, payload: data };
}

export function updateTaskFailure(error: string): UpdateTaskFailure {
  return { type: UPDATE_TASK_FAILURE, payload: error };
}

export function deleteTaskRequest(): DeleteTaskRequest {
  return { type: DELETE_TASK_REQUEST };
}

export function deleteTaskSuccess(data: {
  id: number;
  message: string;
}): DeleteTaskSuccess {
  return { type: DELETE_TASK_SUCCESS, payload: data };
}

export function deleteTaskFailure(error: string): DeleteTaskFailure {
  return { type: DELETE_TASK_FAILURE, payload: error };
}

export function fetchTaskRequest(): FetchTaskRequest {
  return {
    type: FETCH_TASK_REQUEST,
  };
}

export function fetchTaskSuccess(data: Task): FetchTaskSuccess {
  return {
    type: FETCH_TASK_SUCCESS,
    payload: data,
  };
}

export function fetchTaskFailure(error: string): FetchTaskFailure {
  return {
    type: FETCH_TASK_FAILURE,
    payload: error,
  };
}

export function toggleDarkMode() {
  return { type: TOGGLE_DARK_MODE };
}
