import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API_URL;

export const getAllPaymentType = async (page = 0, size = 10) => {
  try {
    const res = await axios.get(
      `${api}/payment-type?page=${page}&size=${size}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const addPaymentType = async (name) => {
  try {
    const res = await axios.post(
      `${api}/payment-type/add?name=${name}`,
      {},
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const updatePaymentType = async (id, name) => {
  try {
    const res = await axios.put(
      `${api}/payment-type/update?id=${id}&name=${name}`,
      {},
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const deletePaymentType = async (id) => {
  try {
    const res = await axios.delete(
      `${api}/payment-type/delete?id=${id}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const searchPaymentType = async (name) => {
  try {
    const res = await axios.get(
      `${api}/payment-type/search?name=${name}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};
