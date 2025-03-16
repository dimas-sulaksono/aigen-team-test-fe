import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API_URL;
export const getAllClass = async (page = 0, size = 10) => {
  try {
    const res = await axios.get(
      `${api}/class/all?page=${page}&size=${size}`,
      getAuthHeader(),
    );

    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.response };
  }
};
