import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_URL;

export const login = async (payload) => {
  try {
    const response = await axios.post(`${api}/user/login`, payload);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response.data,
    };
  }
};

export const register = async (payload) => {
  try {
    const response = await axios.post(`${api}/user/register`, payload);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response.data,
    };
  }
};
