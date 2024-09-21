

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
} from "./actionTypes";

// Task type
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  duedate: string;
}

// State type
export interface TaskState {
  loading: boolean;
  tasks: Task[];
  task: Task | null;
  error: string | null;
}

export interface NewTask {
  title: string;
  description: string;
  completed: boolean;
  duedate: string;
}

export interface DeletedTask {
  id: number;
  message: string;
}

// Action types
export interface FetchTasksRequest {
  type: typeof FETCH_TASKS_REQUEST;
}

export interface FetchTasksSuccess {
  type: typeof FETCH_TASKS_SUCCESS;
  payload: Task[];
}

export interface FetchTasksFailure {
  type: typeof FETCH_TASKS_FAILURE;
  payload: string;
}

export interface AddTaskRequest {
  type: typeof ADD_TASK_REQUEST;
}

export interface AddTaskSuccess {
  type: typeof ADD_TASK_SUCCESS;
  payload: Task;
}

export interface AddTaskFailure {
  type: typeof ADD_TASK_FAILURE;
  payload: string;
}

export interface DeleteTaskRequest {
  type: typeof DELETE_TASK_REQUEST;
}

export interface DeleteTaskSuccess {
  type: typeof DELETE_TASK_SUCCESS;
  payload: DeletedTask;
}

export interface DeleteTaskFailure {
  type: typeof DELETE_TASK_FAILURE;
  payload: string;
}

export interface FetchTaskRequest {
  type: typeof FETCH_TASK_REQUEST;
}

export interface FetchTaskSuccess {
  type: typeof FETCH_TASK_SUCCESS;
  payload: Task;
}

export interface FetchTaskFailure {
  type: typeof FETCH_TASK_FAILURE;
  payload: string;
}

export interface UpdateTaskRequest {
  type: typeof UPDATE_TASK_REQUEST;
}

export interface UpdateTaskSuccess {
  type: typeof UPDATE_TASK_SUCCESS;
  payload: Task;
}

export interface UpdateTaskFailure {
  type: typeof UPDATE_TASK_FAILURE;
  payload: string;
}

// Union of all action types
export type TasksActionTypes =
  | FetchTasksRequest
  | FetchTasksSuccess
  | FetchTasksFailure
  | AddTaskRequest
  | AddTaskSuccess
  | AddTaskFailure
  | DeleteTaskRequest
  | DeleteTaskSuccess
  | DeleteTaskFailure
  | FetchTaskRequest
  | FetchTaskSuccess
  | FetchTaskFailure
  | UpdateTaskRequest
  | UpdateTaskSuccess
  | UpdateTaskFailure;
