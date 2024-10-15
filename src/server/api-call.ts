import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { boxServer } from './box-server'; // Import the boxServer instance

export enum API_CALL_TYPE {
  HTTP_GET = 'GET',
  HTTP_POST = 'POST',
  HTTP_PUT = 'PUT',
  HTTP_PATCH = 'PATCH',
  HTTP_DELETE = 'DELETE',
}

// Define the structure of the response object
export interface ApiResponse<T> {
  isSuccess: boolean;
  data?: T;
//   headers?: Record<string, string>;
  message?: string;
}

// Generic function to handle API calls using boxServer
export const makeApiCall = async <T>(
  callType: API_CALL_TYPE,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
): Promise<ApiResponse<T>> => {
  const userCookie = Cookies.get('userSessionKey'); // Fetch cookie using js-cookie
  const headers: Record<string, string> = {};

  if (userCookie) {
    headers['cookie'] = userCookie;
  }

  try {
    let response: AxiosResponse;

    switch (callType) {
      case API_CALL_TYPE.HTTP_GET:
        response = await boxServer.get(url, { headers });
        break;
      case API_CALL_TYPE.HTTP_POST:
        response = await boxServer.post(url, body, {
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
        break;
      case API_CALL_TYPE.HTTP_PUT:
        response = await boxServer.put(url, body, {
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
        break;
      case API_CALL_TYPE.HTTP_PATCH:
        response = await boxServer.patch(url, body, {
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
        break;
      case API_CALL_TYPE.HTTP_DELETE:
        response = await boxServer.delete(url, { headers });
        break;
      default:
        throw new Error('Unsupported API call type');
    }

    console.log("kdjcndsjkxbcdjksx", response)

    if (response.status === 200) {
      // Use the formatHeaders function to format the headers
      return {
        isSuccess: true,
        data: response.data as T,
        // headers: formatHeaders(response.headers), // Sanitize headers here
      };
    } else {
      return {
        isSuccess: false,
        message: 'Error occurred during API call',
      };
    }
  } catch (error) {
    console.error('API call error:', error);
    return {
      isSuccess: false,
      message: 'API call failed',
    };
  }
};
