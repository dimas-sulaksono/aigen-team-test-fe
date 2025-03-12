import axios from 'axios';
import { getAuthHeader } from './auth';

const api = process.env.NEXT_PUBLIC_API_URL;

export const getUserPaymentHistory = async () => {
  try {
    const res = await axios.get(`${api}/payment/me`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);

    return { status: false, message: error.response };
  }
};
