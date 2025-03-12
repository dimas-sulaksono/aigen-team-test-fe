import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export const getUserPaymentHistory = async () => {
  try {
    const res = await axios.get(`${api}/payment/me`);
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);

    return { status: false };
  }
};
