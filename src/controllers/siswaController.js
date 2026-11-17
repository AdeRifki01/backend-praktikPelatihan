const db = require('../db');

// GET all siswa (supports optional search by nama or kode)
const getAllSiswa = async (req, res) => {
  try {
    const { search } = req.query;
    let queryText = 'SELECT * FROM siswa';
    const params = [];

    if (search) {
      queryText += ' WHERE nama_siswa ILIKE $1 OR kode_siswa ILIKE $1 OR jurusan_siswa ILIKE $1';
      params.push(`%${search}%`);
    }

    queryText += ' ORDER BY id ASC';

    const result = await db.query(queryText, params);
    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil data siswa',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error getAllSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data siswa: ' + error.message,
    });
  }
};

// GET siswa by ID
const getSiswaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM siswa WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data siswa tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil detail siswa',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error getSiswaById:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail siswa: ' + error.message,
    });
  }
};

// POST create new siswa
const createSiswa = async (req, res) => {
  try {
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

    if (!kode_siswa || !nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
      return res.status(400).json({
        success: false,
        message: 'Semua field (Kode Siswa, Nama Siswa, Alamat Siswa, Tgl Siswa, Jurusan Siswa) wajib diisi!',
      });
    }

    // Check if kode_siswa already exists
    const checkKode = await db.query('SELECT id FROM siswa WHERE kode_siswa = $1', [kode_siswa]);
    if (checkKode.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Kode siswa '${kode_siswa}' sudah digunakan. Harap gunakan kode lain.`,
      });
    }

    const queryText = `
      INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [kode_siswa.trim(), nama_siswa.trim(), alamat_siswa.trim(), tgl_siswa, jurusan_siswa.trim()];

    const result = await db.query(queryText, values);
    return res.status(201).json({
      success: true,
      message: 'Data siswa berhasil ditambahkan',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error createSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan data siswa: ' + error.message,
    });
  }
};

// PUT update siswa
const updateSiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

    if (!kode_siswa || !nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
      return res.status(400).json({
        success: false,
        message: 'Semua field wajib diisi!',
      });
    }

    // Check existence
    const existing = await db.query('SELECT * FROM siswa WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data siswa tidak ditemukan',
      });
    }

    // Check duplicate kode_siswa on other records
    const checkKode = await db.query('SELECT id FROM siswa WHERE kode_siswa = $1 AND id != $2', [kode_siswa, id]);
    if (checkKode.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Kode siswa '${kode_siswa}' sudah digunakan oleh siswa lain.`,
      });
    }

    const queryText = `
      UPDATE siswa
      SET kode_siswa = $1, nama_siswa = $2, alamat_siswa = $3, tgl_siswa = $4, jurusan_siswa = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const values = [kode_siswa.trim(), nama_siswa.trim(), alamat_siswa.trim(), tgl_siswa, jurusan_siswa.trim(), id];

    const result = await db.query(queryText, values);
    return res.status(200).json({
      success: true,
      message: 'Data siswa berhasil diperbarui',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error updateSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data siswa: ' + error.message,
    });
  }
};

// DELETE siswa
const deleteSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query('DELETE FROM siswa WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data siswa tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data siswa berhasil dihapus',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error deleteSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus data siswa: ' + error.message,
    });
  }
};

module.exports = {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
};
