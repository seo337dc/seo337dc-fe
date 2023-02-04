import axios from 'axios';

export const loginFn = async () => {
  return await axios.post('https://api.sixshop.com/login', {});
};
