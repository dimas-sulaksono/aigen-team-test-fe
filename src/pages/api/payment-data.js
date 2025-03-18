let paymentData = null; // Simpan data sementara

export default function handler(req, res) {
  if (req.method === "POST") {
    // Simpan data pembayaran
    paymentData = req.body;
    return res.status(200).json({ message: "Data tersimpan" });
  }

  if (req.method === "GET") {
    // Ambil data pembayaran
    if (!paymentData)
      return res.status(404).end();
    return res.status(200).json(paymentData);
  }

  return res.status(405).end(); // Method tidak diizinkan
}
