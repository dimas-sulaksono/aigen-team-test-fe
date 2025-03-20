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

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllUsers = async (payload) => {
  try {
    const response = await axios.get(`${api}/user/all`, {
      params: payload,
    });
    return { status: true, data: response.data?.data };
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${api}/user/${userId}`);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};

export const getUserByusername = async (username) => {
  try {
    const response = await axios.get(`${api}/user/${username}`);
    console.log(response.data);

    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};

export const getByemail = async (email) => {
  try {
    const response = await axios.get(`${api}/user/email/${email}`);

    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};

export const updateUser = async (userId, formData) => {
  try {
    const response = await axios.put(`${api}/user/update/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);

    return { status: true, data: response.data?.data };
  } catch (error) {
    return {
      status: false,
      message: error.response?.data || "Terjadi kesalahan",
    };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${api}/user/delete/${userId}`);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};

export const filterUser = async (role, page = 0, size = 10) => {
  try {
    const res = await axios.get(
      `${api}/user/filter?role=${role}&page=${page}&size=${size}`,
      getAuthHeader(),
    );
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};
