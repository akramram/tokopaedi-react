# Implementasi Fitur Pagination pada Hasil Pencarian (Frontend)

## Deskripsi Tugas
Saat ini, aplikasi *frontend* hanya menampilkan hasil pencarian terbatas pada halaman pertama (1 halaman saja). Karena data produk hasil pencarian bisa berjumlah ratusan dan mencakup puluhan halaman, sangat penting untuk menambahkan fitur **Pagination** (penomoran halaman). Fitur ini akan memungkinkan pengguna untuk menavigasi dan melihat daftar produk di halaman-halaman selanjutnya secara sistematis.

## Tujuan Utama
- Memastikan pengguna dapat berpindah dari satu halaman hasil pencarian ke halaman lainnya (Previous / Next).
- Memuat profil data dari backend *(fetching)* sesuai dengan nomor halaman yang diakses.
- Menjaga agar elemen pencarian lain (kata kunci, filter harga, rating, dsb.) tidak hilang atau ter-reset ketika pengguna berpindah halaman.

## Instruksi Pengerjaan (High-Level)

Pekerjaan ini mencakup penambahan fitur di sisi *frontend* (React/Next.js) dan memastikan komunikasi yang tepat dengan *backend*.

### 1. Penambahan State untuk Halaman (State Management)
- Tambahkan sebuah *state* baru di dalam komponen utama yang menangani hasil pencarian untuk melacak nomor halaman saat ini (misalnya `currentPage`).
- Atur nilai bawaan (*default*) halaman pada angka 1 setiap kali pengguna memulai pencarian baru.

### 2. Modifikasi Parameter Pemanggilan API
- Sesuaikan fungsi pemanggilan API (menggunakan axios/fetch) ke *backend*.
- Tambahkan parameter yang relevan untuk *pagination* (misalnya `page`, `start`, atau logika *offset* / *limit* yang didukung backend) ke dalam setiap request yang dikirimkan.
- Pastikan parameter baru ini digabungkan secara dinamis dengan parameter filter pencarian yang sudah aktif.

### 3. Pembuatan Antarmuka (UI) Pagination
- Buat atau tambahkan komponen UI Pagination di bagian bawah daftar produk. Komponen ini setidaknya harus memiliki tombol **Sebelumnya (Previous)** dan **Selanjutnya (Next)**.
- Tambahkan logika sederhana pada UI: Nonaktifkan (*disable*) tombol "Sebelumnya" jika pengguna berada di halaman 1.
- Jika API mengembalikan informasi "halaman terakhir" atau membalas dengan *array* kosong, gunakan logika tersebut untuk menonaktifkan tombol "Selanjutnya" di akhir daftar.

### 4. Optimalisasi User Experience (UX)
- Tampilkan indikator *loading* visual saat pengguna menekan tombol "Next" atau "Previous" dan sedang menunggu data dari server.
- Setelah data baru halaman tersebut tiba, kembalikan posisi tampilan pengguna (scroll) ke bagian atas daftar produk secara otomatis agar pengguna tidak perlu *scroll* manual.

### 5. Skenario Pengujian (Testing)
- Lakukan pencarian menggunakan kata kunci umum (misal: "laptop") yang pasti menghasilkan banyak produk.
- Tekan "Selanjutnya" untuk memastikan data yang muncul berbeda dengan halaman 1.
- Terapkan filter tambahan (contoh: rentang harga) lalu navigasi ke halaman 2. Pastikan filter harga masih berlaku dan tidak me-reset daftar.
- Pastikan tombol navigasi berperilaku sesuai harapan (contoh: tidak bisa kembali dari halaman 1).
