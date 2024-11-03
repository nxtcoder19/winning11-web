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

interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  isAgent: boolean;
}

interface SessionData {
  userId: string;
  mobileNo?: number; // Optional for regular users
  email?: string;    // Optional for admin users
  isAdmin: boolean;
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

  const getAdminUser = async ({email}: {email: string}): Promise<ApiResponse<AdminUser>> => {
    const url = `auth/get-admin/${email}`; // Replace with the actual endpoint if different
    return await makeApiCall<AdminUser>(API_CALL_TYPE.HTTP_GET, url);
  };

  const getSessionData = async (): Promise<ApiResponse<SessionData>> => {
    const url = '.secret/session-data'; // Path for session data endpoint
    return await makeApiCall<SessionData>(API_CALL_TYPE.HTTP_GET, url);
  };
  

export const authRepository = {
    adminSignup,
    adminSignIn,
    getAdminUser,
    getSessionData,
};

//piyush@gmail.com pass: 12345