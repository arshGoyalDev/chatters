const HOST = process.env.NEXT_PUBLIC_SERVER_URL;

const AUTH_ROUTES = "api/auth";
const SIGN_UP_ROUTE = `${AUTH_ROUTES}/sign-up`;
const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
const GET_USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;

export { HOST, AUTH_ROUTES, SIGN_UP_ROUTE, LOGIN_ROUTE, GET_USER_INFO_ROUTE };
