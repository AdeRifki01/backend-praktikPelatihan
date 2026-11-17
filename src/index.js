const express = require('express');
const cors = require('cors');
require('dotenv').config();

const siswaRoutes = require('./routes/siswaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging simple middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root / Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API CRUD Siswa (Express.js & PostgreSQL) berjalan lancar.',
    endpoints: {
      getAllSiswa: 'GET /api/siswa',
      getSiswaById: 'GET /api/siswa/:id',
      createSiswa: 'POST /api/siswa',
      updateSiswa: 'PUT /api/siswa/:id',
      deleteSiswa: 'DELETE /api/siswa/:id',
    },
  });
});

// Routes
app.use('/api/siswa', siswaRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server: ' + err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`===============================================`);
});
