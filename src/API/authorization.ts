import axios, { AxiosError } from 'axios';
import { BASE_URL } from './URL';
export const USERS = `${BASE_URL}users`;

export interface ILoginUser {
  email: string;
  password: string;
  showPassword?: boolean;
}

export interface IGetUSer {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
}

export interface IUser {
  id: string;
  email: string;
}

export async function userSignUpAPI(user: ILoginUser): Promise<unknown> {
  const res = await fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (res.status === 200) {
    return res.json();
  } else if (res.status === 400) {
    throw new Error('Bad request. Please provide valid credentials.');
  } else if (res.status === 401) {
    throw new Error('Unauthorized. Please check your email and password.');
  } else if (res.status === 417) {
    throw new Error('This email already exists, please use another one.');
  } else if (res.status === 403) {
    throw new Error('Your password is incorrect. Please check your credentials.');
  } else if (res.status === 404) {
    throw new Error('This email does not exist. Please check your credentials.');
  } else if (res.status === 500) {
    throw new Error('Internal server error. Please try again later.');
  } else {
    throw new Error('Server error. Please try again later.');
  }
}

export async function userLoginAPI(user: ILoginUser): Promise<IGetUSer | boolean> {
  const res = await fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (res.status === 200) {
    return res.json();
  } else if (res.status === 400) {
    throw new Error('Bad request. Please provide valid credentials.');
  } else if (res.status === 401) {
    throw new Error('Unauthorized. Please check your email and password.');
  } else if (res.status === 403) {
    throw new Error('Your password is incorrect. Please check your credentials.');
  } else if (res.status === 404) {
    throw new Error('This email does not exist. Please check your credentials.');
  } else if (res.status === 500) {
    throw new Error('Internal server error. Please try again later.');
  } else {
    throw new Error('Server error. Please try again later.');
  }
}

export async function getUserAPI(userId: string): Promise<IUser | null> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return res.status === 200 ? res.json() : null;
}

export const getTokenConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getRefreshToken()}`,
    },
  };
};

export function getToken(): string {
  const storedToken = localStorage.getItem('userData');
  let token = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken) as IGetUSer;
    token = userData.token as string;
  }
  return token;
}

export const getNewToken = async () => {
  const USER = `${USERS}/${getUserId()}`;
  const USER_TOKEN = `${USER}/tokens`;
  axios
    .get(USER_TOKEN, getTokenConfig())
    .then(({ data }) => {
      localStorage.setItem('userData', data.token);
      localStorage.setItem('userData', data.refreshToken);
    })
    .catch(() => {
      localStorage.removeItem('userData');
      location.reload();
    });
};

export function getRefreshToken(): string {
  const storedToken = localStorage.getItem('userData');
  let token = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken) as IGetUSer;
    token = userData.refreshToken as string;
  }
  return token;
}

export function getUserId(): string | null {
  const storedToken = localStorage.getItem('userData');
  if (!storedToken) return null;

  let id: string | null = null;

  try {
    const userData = JSON.parse(storedToken) as IGetUSer;
    if (userData && typeof userData.userId === 'string') {
      id = userData.userId;
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  return id;
}

export async function checkUserAuthorization(): Promise<IUser | null> {
  const storedToken = localStorage.getItem('userData');
  let user;
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken) as IGetUSer;
    user = await getUserAPI(userData.userId);
  } else {
    user = null;
  }
  return user;
}

export const getUserById = (id: string) => {
  return axios.get<IUser>(`${BASE_URL}/users/${id}`);
};

export const createUser = async (body: ILoginUser) => {
  try {
    await axios.post<ILoginUser>(`${BASE_URL}/users`, body);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          throw new Error('Bad request. Please provide valid credentials.');
        } else if (status === 401) {
          throw new Error('Unauthorized. Please check your email and password.');
        } else if (status === 403) {
          throw new Error('Forbidden. You do not have permission to access this resource.');
        } else if (status === 404) {
          throw new Error('Resource not found. Please try again later.');
        } else if (status === 500) {
          throw new Error('Internal server error. Please try again later.');
        }
      }
    }
    throw new Error('An error occurred. Please try again later.');
  }
};

export const loginUser = async (body: ILoginUser) => {
  try {
    const response = await axios.post<ILoginUser>(`${BASE_URL}signin`, body);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error('Bad request. Please provide valid credentials.');
      } else if (status === 401) {
        throw new Error('Unauthorized. Please check your email and password.');
      } else if (status === 403) {
        throw new Error('Your password is incorrect. Please check your credentials.');
      } else if (status === 404) {
        throw new Error('This email does not exist. Please check your credentials.');
      } else if (status === 500) {
        throw new Error('Internal server error. Please try again later.');
      } else {
        throw new Error('Server error. Please try again later.');
      }
    } else {
      throw new Error('An error occurred. Please try again later.');
    }
  }
};

export const updateUser = (id: string, body: ILoginUser) => {
  return axios.put<ILoginUser>(`${BASE_URL}/users/${id}`, body);
};

export const deleteUser = (id: string) => {
  return axios.delete(`${BASE_URL}/users/${id}`);
};
