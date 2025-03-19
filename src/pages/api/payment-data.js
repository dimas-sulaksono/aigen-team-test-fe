let paymentData = null;

export default function handler(req, res) {
  if (req.method === "POST") {
    paymentData = req.body;
    return res.status(200).json({ message: "Data tersimpan" });
  }

  if (req.method === "GET") {
    // Jika hanya ingin mengecek ketersediaan data
    if (req.query.check === "true") {
      return res.status(200).json({ ready: paymentData !== null });
    }

    // Pastikan tidak mengembalikan 404, biarkan frontend yang menangani
    return res.status(200).json(paymentData || {});
  }

  return res.status(405).end();
}
