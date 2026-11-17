-- Skrip Inisialisasi Database PostgreSQL
CREATE DATABASE db_siswa;

\c db_siswa;

CREATE TABLE IF NOT EXISTS siswa (
    id SERIAL PRIMARY KEY,
    kode_siswa VARCHAR(50) UNIQUE NOT NULL,
    nama_siswa VARCHAR(150) NOT NULL,
    alamat_siswa TEXT NOT NULL,
    tgl_siswa DATE NOT NULL,
    jurusan_siswa VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Dummy Awal
INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) VALUES
('SIS-001', 'Ahmad Pratama', 'Jl. Merdeka No. 10, Jakarta Pusat', '2006-05-14', 'Rekayasa Perangkat Lunak'),
('SIS-002', 'Siti Rahmawati', 'Jl. Melati No. 25, Bandung', '2006-08-20', 'Teknik Komputer dan Jaringan'),
('SIS-003', 'Budi Santoso', 'Jl. Diponegoro No. 8, Surabaya', '2005-11-12', 'Multimedia')
ON CONFLICT (kode_siswa) DO NOTHING;
