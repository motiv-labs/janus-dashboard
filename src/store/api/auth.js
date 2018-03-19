import client from './index'

// Temporary login hacks
export const login = (username, password) => client.post('login', { username, password })
