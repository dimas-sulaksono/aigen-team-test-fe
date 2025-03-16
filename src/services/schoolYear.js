import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API_URL;

export const getAllSchoolYear = async (page = 0, size = 10) => {
  try {
    const res = await axios.get(
      `${api}/school-years/all?page=${page}&size=${size}`,
      getAuthHeader(),
    );

    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const addSchoolYear = async (payload) => {
  try {
    const res = await axios.post(
      `${api}/school-years/add`,
      payload,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const updateSchoolYear = async (id, payload) => {
  try {
    const res = await axios.put(
      `${api}/school-years/update/${id}`,
      payload,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const deleteSchoolYear = async (id) => {
  try {
    const res = await axios.delete(
      `${api}/school-years/delete/${id}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};
