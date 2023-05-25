import axios from 'axios';
import { BASE_URL } from './URL';
export const USERS = `${BASE_URL}users`;
export const USER = `${USERS}/${getUserId()}`;
export const USER_TOKEN = `${USER}/tokens`;

export interface ILoginUser {
  email: string;
  password: string;
  showPassword?: boolean;
}

// export interface ISignUpUser extends ILoginUser {
//   name: string;
// }

export interface IGetUSer {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  // name: string;
}

export interface IUser {
  id: string;
  // name: string;
  email: string;
}

export async function userSignUpAPI(user: ILoginUser): Promise<boolean> {
  const res = await fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res.status === 200;
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
  return res.status === 200 ? res.json() : false;
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

export const getNewToken = async () =>
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

export function getRefreshToken(): string {
  const storedToken = localStorage.getItem('userData');
  let token = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken) as IGetUSer;
    token = userData.refreshToken as string;
  }
  return token;
}

export function getUserId(): string {
  const storedToken = localStorage.getItem('userData');
  let id = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken) as IGetUSer;
    id = userData.userId as string;
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
