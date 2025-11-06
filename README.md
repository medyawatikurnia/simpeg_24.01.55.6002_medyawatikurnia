# simpeg_24.01.55.6002_medyawatikurnia
Sistem Informasi Manajemen Kepegawaian (SIMPEG) berbasis PHP-CRUD-API

# 🧑‍💼 SIMPEG — Sistem Informasi Manajemen Kepegawaian

**SIMPEG (Sistem Informasi Manajemen Kepegawaian)** adalah aplikasi web berbasis PHP dan JavaScript yang digunakan untuk mengelola data pegawai di lingkungan instansi pemerintahan atau organisasi.  
Aplikasi ini dikembangkan menggunakan **PHP-CRUD-API** sebagai backend dan **Bootstrap 5** sebagai frontend framework agar tampil modern, responsif, dan mudah digunakan.

---

## 🚀 Fitur Utama

- 🔐 **Login System**
  - Autentikasi pengguna dengan username dan password (dihash di server)
  - Akses halaman dibatasi hanya untuk pengguna yang sudah login

- 📊 **Dashboard Interaktif**
  - Statistik pegawai aktif, cuti, dan jumlah departemen
  - Grafik batang jumlah pegawai per departemen (Chart.js)

- 👨‍💼 **Manajemen Data Pegawai**
  - CRUD (Create, Read, Update, Delete) data pegawai
  - Fitur pencarian & filter berdasarkan status
  - Modal form untuk tambah/edit data tanpa reload halaman

- 🏢 **Manajemen Departemen**
  - Menampilkan data departemen (terhubung dengan pegawai)
  - Dashboard otomatis menghitung total pegawai tiap departemen

- 💾 **Database MySQL**
  - Database: `sim_pegawai`
  - Tabel utama: `employees`, `departments`, `leave_requests`, `users`

---

## 🧰 Teknologi yang Digunakan

| Komponen | Teknologi |
|-----------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6), Bootstrap 5, Chart.js |
| **Backend API** | [PHP-CRUD-API](https://github.com/mevdschee/php-crud-api) |
| **Database** | MySQL |
| **Server Lokal** | XAMPP / Laragon |
| **Version Control** | Git & GitHub |

---

## ⚙️ Cara Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/medyawatikurnia/simpeg_24.01.55.6002_medyawatikurnia.git

2. **Pindahkan ke Folder XAMPP**
Letakkan folder hasil clone ke:
C:\xampp\htdocs\

3. **Import Database**

Buka phpMyAdmin

Buat database dengan nama: sim_pegawai

Import file SQL: sim_pegawai.sql

4. **Jalankan Server**
   Aktifkan Apache dan MySQL di XAMPP

Akses aplikasi di browser:
http://localhost/simpeg_24.01.55.6002_medyawatikurnia/

6. **Login**
   Buka halaman login.html

Masukkan username & password sesuai data pada tabel users

STRUKTUR FOLDER
simpeg_24.01.55.6002_medyawatikurnia/
│
├── api.php                # Endpoint utama PHP CRUD API
├── sim_pegawai.sql        # File database
├── index.html             # Dashboard utama
├── pegawai.html           # Halaman CRUD data pegawai
│
├── css/
│   └── style.css          # File stylesheet custom
│
├── js/
│   ├── navbar.js          # Navbar & autentikasi login
│   ├── main.js            # Dashboard data dan chart
│   └── pegawai.js         # Logika CRUD pegawai
│
└── assets/                # (opsional) ikon, logo, gambar

💬 Kontributor

👩‍💻 Medyawati Kurnia_24.01.55.6002
Proyek tugas pengembangan aplikasi Sistem Informasi Manajemen Kepegawaian (SIMPEG)



