import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
  baseURL: 'http://seungmin.shop',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

instance.defaults.headers.common['Authorization'] = `${localStorage.getItem('accessToken')}`;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: object) => instance.post(url, body).then(responseBody),
  put: (url: string, body: object) => instance.put(url, body).then(responseBody),
  patch: (url: string, body: object) => instance.patch(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const user = {
  signin: (signInData: { id: string; password: string }) =>
    requests.post('/user/signin', signInData),
  signup: (signUpData: { id: string; password: string }) => requests.post('/user', signUpData),
};

export const todo = {
  load: (): Promise<
    { id: number; content: string; isComplete: boolean; deadline: Date; sequence: number }[]
  > => requests.get('/todo'),
  create: (content: string) => requests.post('/todo', { content }),
  update: (id: number, content: string) => requests.patch(`/todo/content/${id}`, { content }),
  delete: (id: number) => requests.delete(`/todo/${id}`),
  toggleComplete: (id: number, isComplete: boolean) =>
    requests.patch(`/todo/complete/${id}`, { isComplete }),
  changeOrder: (data: { from: number; to: number }) => requests.patch('/todo/sequence', data),
};
