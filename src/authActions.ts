import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  UPDATE_USER,
} from "./constants/actionTypes";

export function logoutUser() {
  return { type: LOGOUT_USER };
}

export function signupUserRequest() {
  return { type: SIGNUP_USER_REQUEST };
}

export function signupUserSuccess(data: any) {
  return { type: SIGNUP_USER_SUCCESS, payload: data };
}

export function signupUserFailure(error: any) {
  return { type: SIGNUP_USER_FAILURE, payload: error };
}

export function loginUserRequest() {
  return { type: LOGIN_USER_REQUEST };
}

export function loginUserSuccess(data: any) {
  return { type: LOGIN_USER_SUCCESS, payload: data };
}

export function loginUserFailure(error: any) {
  return { type: LOGIN_USER_FAILURE, payload: error };
}

export function updateUser(data: any) {
  return { type: UPDATE_USER, payload: data };
}
