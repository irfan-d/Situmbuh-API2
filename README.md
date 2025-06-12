---

# 📘 Situmbuh API Documentation

API untuk aplikasi Situmbuh. Mendukung fitur autentikasi, manajemen profil, prediksi stunting, alamat, rekomendasi dokter/bidan, dan artikel edukasi.

---

## Endpoint: `https://situmbuh-api-production-832d.up.railway.app/`

---

## 🌐 Root

### 👋 Welcome

**Endpoint:** `GET /`  
**Response:** `200 OK`  
**Returns:**
```json
{
  "status": "succes",
  "message": "Welcome to Situmbuh API"
}
```

---

## 🔐 Authentication

### 📝 Register

**Endpoint:** `POST /register`  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "full_name": "User Name"
}
```
**Response:** `201 Created`

---

### 🔓 Login

**Endpoint:** `POST /login`  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
**Response:** `200 OK`  
**Returns:** Session token

---

### 🔒 Logout

**Endpoint:** `POST /logout`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`

---

## 👤 Profile

### 🔍 Get Profile

**Endpoint:** `GET /profile`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`  
**Returns:** Data profil user

---

### ➕ Add/Update Profile

**Endpoint:** `POST /profile`  
**Header:**
```
Authorization: Bearer <token>
```
**Body:**
```json
{
  "gender": "Male",
  "birth_date": "1990-01-01",
  "phone_number": "081234567890",
  "job": "Student"
}
```
**Response:** `200 OK`

---

### ✏️ Edit Profile

**Endpoint:** `PUT /profile`  
**Header:**
```
Authorization: Bearer <token>
```
**Body:**
```json
{
  "full_name": "Updated Name",
  "gender": "Female",
  "birth_date": "1995-05-05",
  "phone_number": "089876543210",
  "job": "Engineer"
}
```
**Response:** `200 OK`

---

## 📈 Prediction

### 📄 Get All Predictions

**Endpoint:** `GET /predict`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`  
**Returns:** Daftar riwayat prediksi

---

### 🔎 Get Prediction Detail

**Endpoint:** `GET /predict/{id}`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`  
**Returns:** Detail prediksi

---

### ➕ Add Prediction

**Endpoint:** `POST /predict`  
**Header:**
```
Authorization: Bearer <token>
```
**Body:** *(disesuaikan kebutuhan input model, contoh:)*  
```json
{
  "child_name": "Budi",
  "gender": 1,
  "age": 24,
  "body_length": 80,
  "birth_weight": 3.2,
  "breastfeeding": 1
}
```
**Response:** `200 OK`  
**Returns:** Hasil prediksi

---

### ❌ Delete Prediction

**Endpoint:** `DELETE /predict/{id}`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`

---

## 🏠 Address

### 📍 Get Address

**Endpoint:** `GET /address`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`  
**Returns:** Data alamat user

---

### ➕ Add Address

**Endpoint:** `POST /address`  
**Header:**
```
Authorization: Bearer <token>
```
**Body:**
```json
{
  "country": "Indonesia",
  "province": "Jawa Barat",
  "regency_city": "Bandung",
  "subdistrict": "Coblong",
  "village": "Dago",
  "street_name": "Jl. Merdeka",
  "house_number": "123",
  "postal_code": "40135"
}
```
**Response:** `200 OK`

---

### ✏️ Update Address

**Endpoint:** `PUT /address`  
**Header:**
```
Authorization: Bearer <token>
```
**Body:** *(sama seperti Add Address)*  
**Response:** `200 OK`

---

## 🩺 Rekomendasi Dokter/Bidan Terdekat

### 🏥 Get Nearby Doctor/Bidan

**Endpoint:** `GET /nearby-doctor`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`  
**Returns:** Daftar dokter/bidan terdekat (berdasarkan alamat user)

---

## 👩‍⚕️ Daftar Bidan

### 📋 Get All Bidan

**Endpoint:** `GET /bidan`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`  
**Returns:** Daftar bidan/dokter dari database

---

## 📚 Artikel Edukasi

### 📰 Get Articles

**Endpoint:** `GET /articles?topic=stunting`  
**Header:**
```
Authorization: Bearer <token>
```
**Response:** `200 OK`  
**Returns:** Daftar artikel edukasi dari NewsAPI (topik bisa diganti)

---

> 🔐 Semua endpoint (kecuali `/register`, `/login`, dan `/`) membutuhkan header `Authorization: Bearer <token>`.  
> Untuk gambar bidan, gunakan field `foto_url` pada response `/bidan`.

---
