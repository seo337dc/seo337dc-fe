import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { TUserDto } from '@Type/user';

export const loginFn = async () => {
  return await axios.post('https://api.sixshop.com/login', {});
};

export const getUserInfo = async (userId: string): Promise<AxiosResponse<TUserDto>> => {
  return await axios.get(`https://api.sixshop.com/users/${userId}`);
};

export const getProductList = async () => {
  return await axios.post('https://api.sixshop.com/products', {});
};
