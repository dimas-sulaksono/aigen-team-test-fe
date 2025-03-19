import axios from "axios";
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    // Ambil data dari API payment-data
    const { data } = await axios.get("http://localhost:3000/api/payment-data");

    if (!data) return res.status(404).json({ error: "Data tidak ditemukan" });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/payment-details", {
      waitUntil: "networkidle2",
    });

    const pdf = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline;",
    );
    return res.end(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return res.status(500).json({ error: "Gagal membuat PDF" });
  }
}
