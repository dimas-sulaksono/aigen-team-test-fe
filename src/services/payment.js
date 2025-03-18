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

export const downloadPDF = async (payload) => {
  try {

    const save = await axios.post("/api/payment-data", payload);
    if (save.status != 200) throw new Error("Gagal saat store data!.");

    const response = await axios.get("/api/generate-pdf", {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bukti Pembayaran ${payload.name} ${payload.student.name}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Gagal mengunduh PDF:", error);
  }
};
