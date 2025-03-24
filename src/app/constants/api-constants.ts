export const endPoint = 'http://127.0.0.1:8000/api/';


// Status Constants
export const STATUS_SUCCESS = 1;
export const STATUS_FAILED = -1;
export const STATUS_NO_RECORDS = -1;

// Authentication APIs
export const LOGIN = 'token/';
export const SIGNUP = 'signup/';
export const PROFILE = 'profile/';
export const REFRESH_TOKEN_API = 'token/refresh/';

// Transactions
export const TRANSFER_MONEY = 'transfer/';
export const TRANSACTION_HISTORY = 'transactions/';

// Headers
export const KEY_X_AUTH_TOKEN = 'Authorization';
export const KEY_X_REFRESH_TOKEN = 'X-Auth-Refresh-Token';
