import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 p-6 text-center text-2xl font-bold text-white">
        SMK Teknologi dan Kreatif
      </header>
      <section className="bg-purple-500 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">
          Membangun Generasi Kreatif dan Inovatif
        </h1>
        <p className="mb-6 text-lg">
          SMK Teknologi dan Kreatif siap mencetak siswa yang kompeten di bidang
          teknologi dan industri kreatif.
        </p>
        <button className="rounded-lg bg-white px-6 py-2 font-semibold text-purple-500 hover:bg-gray-200">
          Daftar Sekarang
        </button>
      </section>
      <section className="p-10 text-center">
        <h2 className="mb-4 text-3xl font-bold">Tentang Kami</h2>
        <p className="mx-auto max-w-2xl text-gray-700">
          SMK Teknologi dan Kreatif adalah sekolah kejuruan yang berfokus pada
          pengembangan keterampilan di bidang teknologi informasi, desain
          grafis, dan industri kreatif. Kami memiliki fasilitas lengkap dan
          kurikulum berbasis industri untuk mempersiapkan siswa siap kerja.
        </p>
      </section>

      <section className="bg-gray-200 p-10 text-center">
        <h2 className="mb-6 text-3xl font-bold">Program Keahlian</h2>
        <div className="mx-auto max-w-4xl">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">Desain Grafis</h3>
                <p className="text-gray-600">
                  Mempelajari desain visual untuk media cetak dan digital.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">
                  Animasi dan Multimedia
                </h3>
                <p className="text-gray-600">
                  Mengembangkan keterampilan dalam pembuatan animasi dan konten
                  multimedia.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">
                  Rekayasa Perangkat Lunak
                </h3>
                <p className="text-gray-600">
                  Mempelajari pengembangan aplikasi dan sistem informasi.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">
                  Teknik Jaringan Komputer
                </h3>
                <p className="text-gray-600">
                  Mempelajari instalasi dan manajemen jaringan komputer.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">Bisnis Digital</h3>
                <p className="text-gray-600">
                  Mempelajari strategi bisnis dan pemasaran digital.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="p-10 text-center">
        <h2 className="mb-6 text-3xl font-bold">Fasilitas Unggulan</h2>
        <div className="mx-auto max-w-4xl">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">Lab Komputer Modern</h3>
                <p className="text-gray-600">
                  Dilengkapi dengan perangkat terbaru untuk mendukung
                  pembelajaran.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">Studio Desain</h3>
                <p className="text-gray-600">
                  Ruang khusus untuk praktik desain grafis dan animasi.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">Perpustakaan Digital</h3>
                <p className="text-gray-600">
                  Akses ke ribuan buku dan sumber belajar digital.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold">
                  Ruang Praktik Otomotif
                </h3>
                <p className="text-gray-600">
                  Fasilitas lengkap untuk praktik teknik otomotif.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="bg-gray-200 p-10 text-center">
        <h2 className="mb-6 text-3xl font-bold">Testimoni Alumni</h2>
        <div className="mx-auto max-w-4xl">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <p className="text-gray-600 italic">
                  "SMK Teknologi dan Kreatif memberikan saya keterampilan yang
                  dibutuhkan di dunia kerja. Sekarang saya bekerja sebagai
                  desainer grafis di perusahaan ternama."
                </p>
                <p className="mt-4 font-semibold text-gray-800">
                  - Andi, Alumni 2022
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <p className="text-gray-600 italic">
                  "Saya sangat terbantu dengan kurikulum berbasis industri.
                  Setelah lulus, saya langsung diterima bekerja sebagai
                  developer."
                </p>
                <p className="mt-4 font-semibold text-gray-800">
                  - Rina, Alumni 2021
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <p className="text-gray-600 italic">
                  "Fasilitas di SMK ini sangat lengkap dan mendukung
                  pembelajaran. Saya sekarang bekerja sebagai teknisi jaringan
                  di perusahaan IT."
                </p>
                <p className="mt-4 font-semibold text-gray-800">
                  - Budi, Alumni 2020
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="bg-purple-500 py-20 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Bergabunglah Bersama Kami!</h2>
        <p className="mb-6 text-lg">
          Daftarkan diri Anda sekarang dan raih masa depan cerah di SMK
          Teknologi dan Kreatif.
        </p>
        <button className="rounded-lg bg-white px-6 py-2 font-semibold text-purple-500 hover:bg-gray-200">
          Daftar Sekarang
        </button>
      </section>

      <footer className="bg-white py-10 text-gray-600">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">Tentang Kami</h3>
            <p className="text-gray-600">
              SMK Teknologi dan Kreatif adalah sekolah kejuruan yang berfokus
              pada pengembangan keterampilan di bidang teknologi dan industri
              kreatif.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Kontak Kami</h3>
            <p className="text-gray-600">
              Jl. Teknologi No. 123, Kota Kreatif
              <br />
              Email: info@smktekno.com
              <br />
              Telepon: (021) 1234-5678
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Tautan Cepat</h3>
            <ul className="text-gray-600">
              <li>
                <a href="#" className="hover:text-purple-500">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500">
                  Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500">
                  Fasilitas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Ikuti Kami</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100078389857000&locale=id_ID"
                className="text-gray-600 hover:text-purple-500"
              >
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-500">
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/fhr.djohar/"
                className="text-gray-600 hover:text-purple-500"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/fachri-djohar-20b3bb32b/"
                className="text-gray-600 hover:text-purple-500"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
