import axios from 'axios';
import { getAuthHeader } from './auth';

const api = process.env.NEXT_PUBLIC_API_URL;

export const getUserPaymentHistory = async (payload = {}) => {

  try {
    const res = await axios.get(`${api}/payment/me`, { params: payload, ...getAuthHeader() });
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response };
  }
};

export const getUserStudent = async () => {
  try {
    const res = await axios.get(`${api}/payment/student`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response || "Network Error" };
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
    if (save.status !== 200) throw new Error("Gagal saat menyimpan data!");

    // Tunggu hingga data tersedia sebelum lanjut generate PDF
    let isReady = false;
    for (let i = 0; i < 5; i++) {
      const check = await axios.get("/api/payment-data?check=true");
      if (check.data.ready) {
        isReady = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Tunggu 1 detik sebelum cek ulang
    }

    if (!isReady) throw new Error("Data tidak tersedia setelah beberapa percobaan.");

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



export const getAllPayment = async () => {
  try {
    const res = await axios.get(`${api}/payment/student`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response || "Network Error" };
  }
};
