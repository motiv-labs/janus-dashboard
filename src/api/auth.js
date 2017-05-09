import client, { setAccessToken } from '@/api';

// Temporary login hacks
export const login = (username, password) =>
  client.post('login', { username, password })
    .then((response) => {
      console.log(response);
      setAccessToken(response.data.token);
    });
