import axios from 'axios';
import { getAuthHeader } from './auth';

const api = process.env.NEXT_PUBLIC_API_URL;

export const getUserPaymentHistory = async (payload = {}) => {

  try {
    const res = await axios.get(`${api}/payment/me`, { params: payload, ...getAuthHeader() });
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);

    return { status: false, message: error.response };
  }
};

export const getUserStudent = async () => {
  try {
    const res = await axios.get(`${api}/payment/student`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const createNewPayment = async (payload) => {
  try {
    const res = await axios.post(`${api}/payment/add`, payload, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};
