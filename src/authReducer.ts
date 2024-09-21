import {
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER,
} from "./constants/actionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        user: action.payload,
      };
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
