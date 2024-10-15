import { API_CALL_TYPE, ApiResponse, makeApiCall } from "../api-call";

interface SignUpPayLoad {
    name: string;
    email: string;
    password: string;
}

interface SignupResponse {
    id: string;
    name: string;
    email: string;
  }

interface SignInPayLoad {
    email: string;
    password: string;
}

interface SignInResponse {
    id: string;
}

const adminSignup = async (
    payload: SignUpPayLoad
  ): Promise<ApiResponse<SignupResponse>> => {
    const url = 'auth/admin-signup'; // Assuming the backend API endpoint is /admin/signup
    return await makeApiCall<SignupResponse>(API_CALL_TYPE.HTTP_POST, url, payload);
  };

const adminSignIn = async (
    payload: SignInPayLoad
  ): Promise<ApiResponse<SignInResponse>> => {
    const url = 'auth/admin-login'; // Assuming the backend API endpoint is /admin/signup
    return await makeApiCall<SignInResponse>(API_CALL_TYPE.HTTP_POST, url, payload);
  };

export const authRepository = {
    adminSignup,
    adminSignIn,
};

//piyush.acet@gmail.com pass: 12345