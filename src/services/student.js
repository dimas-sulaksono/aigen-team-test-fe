import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API_URL;

export const getAllStudent = async (page = 0, size = 10) => {
  try {
    const res = await axios.get(
      `${api}/student?page=${page}&size=${size}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const addStudent = async (payload) => {
  try {
    const res = await axios.post(
      `${api}/student/add`,
      payload,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const updateStudent = async (id, payload) => {
  try {
    const res = await axios.put(
      `${api}/student/update/${id}`,
      payload,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const deleteStudent = async (id) => {
  try {
    const res = await axios.delete(
      `${api}/student/delete/${id}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};

export const filterStudent = async (
  startDate,
  endDate,
  page = 0,
  size = 10,
) => {
  try {
    const res = await axios.get(
      `${api}/student/filter?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};

export const getStudentByUsername = async (username) => {
  try {
    const res = await axios.get(`${api}/student/${username}`);
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};
