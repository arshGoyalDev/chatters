const HOST = process.env.NEXT_PUBLIC_SERVER_URL;

const AUTH_ROUTES = "api/auth";
const SIGN_UP_ROUTE = `${AUTH_ROUTES}/sign-up`;
const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
const GET_USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;
const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
const ADD_PROFILE_PIC_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
const DELETE_PROFILE_PIC_ROUTE = `${AUTH_ROUTES}/delete-profile-image`;
const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export {
  HOST,
  AUTH_ROUTES,
  SIGN_UP_ROUTE,
  LOGIN_ROUTE,
  GET_USER_INFO_ROUTE,
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_PIC_ROUTE,
  DELETE_PROFILE_PIC_ROUTE,
  LOGOUT_ROUTE,
};
