# Backend Siswa - Express.js & PostgreSQL

Proyek backend API RESTful untuk manajemen Data Siswa (CRUD) menggunakan **Node.js**, **Express.js**, dan **PostgreSQL**.

## 📌 Fitur
- **Create**: Menambah data siswa baru (`kode_siswa`, `nama_siswa`, `alamat_siswa`, `tgl_siswa`, `jurusan_siswa`).
- **Read**: Mengambil semua data siswa (mendukung pencarian) dan detail siswa berdasarkan ID.
- **Update**: Memperbarui data siswa berdasarkan ID.
- **Delete**: Menghapus data siswa berdasarkan ID.
- Validasi data & pencegahan duplikasi `kode_siswa`.

---

## 🛠️ Persyaratan Sistem
- Node.js (v18 atau lebih baru)
- PostgreSQL (aktif di port 5432)

---

## 🚀 Panduan Menjalankan

1. **Instal Dependensi:**
   ```bash
   npm install
   ```

2. **Konfigurasi Database:**
   Salin `.env.example` ke `.env` dan sesuaikan koneksi database PostgreSQL Anda:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=
   DB_NAME=db_siswa
   ```

3. **Inisialisasi Tabel & Data Awal:**
   Jalankan query yang terdapat di `database.sql` pada PostgreSQL.

4. **Jalankan Server:**
   ```bash
   # Mode pengembangan (live reload)
   npm run dev

   # Mode produksi
   npm start
   ```
   Server akan berjalan di `http://localhost:5000`.

---

## 📡 Daftar Endpoint API

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/` | Health check & info endpoint |
| `GET` | `/api/siswa` | Mengambil seluruh data siswa (opsional: `?search=nama`) |
| `GET` | `/api/siswa/:id` | Mengambil data siswa berdasarkan ID |
| `POST` | `/api/siswa` | Menambahkan data siswa baru |
| `PUT` | `/api/siswa/:id` | Memperbarui data siswa berdasarkan ID |
| `DELETE` | `/api/siswa/:id` | Menghapus data siswa berdasarkan ID |
