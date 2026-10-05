# Synchronous vs Asynchronous di JavaScript

Catatan belajar JavaScript: cara JavaScript menjalankan kode, kenapa ada kode yang "menunggu", dan bagaimana menulis kode asynchronous dengan benar.

## Daftar Isi

1. [Penjelasan Synchronous](#1-penjelasan-synchronous)
2. [Penjelasan Asynchronous](#2-penjelasan-asynchronous)
3. [Perbedaan Synchronous dan Asynchronous](#3-perbedaan-synchronous-dan-asynchronous)
4. [Contoh](#4-contoh)
5. [Tiga Cara Menulis Kode Asynchronous](#5-tiga-cara-menulis-kode-asynchronous)
6. [File Contoh di Repo](#6-file-contoh-di-repo)
7. [Kesalahan Umum](#7-kesalahan-umum)
8. [Ringkasan](#8-ringkasan)

---

## Dasar yang Perlu Diketahui Dulu

JavaScript bersifat **single-threaded**: hanya ada **satu jalur eksekusi**, jadi hanya satu baris kode yang berjalan pada satu waktu.

Meski begitu, JavaScript bisa menangani pekerjaan yang lama (ambil data dari server, timer, baca file) tanpa membuat program berhenti total. Caranya dengan bantuan **environment** (browser atau Node.js) dan **Event Loop**.

Komponen yang terlibat:

| Komponen | Fungsi |
|---|---|
| **Call Stack** | Tempat fungsi dieksekusi satu per satu |
| **Web API / Node API** | Menangani pekerjaan lama di luar Call Stack (`setTimeout`, `fetch`, dll.) |
| **Microtask Queue** | Antrean untuk callback Promise (`.then`, `.catch`, `.finally`, kode setelah `await`) |
| **Task Queue (Macrotask)** | Antrean untuk callback `setTimeout`, `setInterval`, event DOM |
| **Event Loop** | Memindahkan callback dari antrean ke Call Stack saat Call Stack kosong |

---

## 1. Penjelasan Synchronous

**Synchronous** (sinkron) artinya kode dijalankan **berurutan, baris demi baris**. Baris berikutnya baru jalan setelah baris sebelumnya **selesai**.

Analogi: **antre di kasir**. Orang kedua baru dilayani setelah orang pertama selesai. Kalau orang pertama lama, semua yang di belakang ikut menunggu.

```js
console.log("1. Bangun tidur");
console.log("2. Mandi");
console.log("3. Sarapan");
```

Output:

```
1. Bangun tidur
2. Mandi
3. Sarapan
```

Ciri-ciri synchronous:

- Urutan eksekusi **pasti** dan mudah ditebak.
- Setiap operasi **memblokir** (blocking) operasi setelahnya sampai selesai.
- Cocok untuk operasi yang cepat (hitung-hitungan, manipulasi string, dll.).
- Berbahaya untuk operasi yang lama, karena seluruh program (termasuk tampilan halaman di browser) bisa terasa **freeze**.

Contoh synchronous yang memblokir:

```js
function tungguBlocking(ms) {
  const mulai = Date.now();
  while (Date.now() - mulai < ms) {
    // CPU sibuk, tidak ada yang bisa jalan selama ini
  }
}

console.log("Mulai");
tungguBlocking(3000); // seluruh program tertahan 3 detik
console.log("Selesai");
```

Di browser, kode seperti ini membuat halaman tidak bisa diklik atau di-scroll selama 3 detik.

---

## 2. Penjelasan Asynchronous

**Asynchronous** (asinkron) artinya pekerjaan yang lama **dimulai dulu, tetapi tidak ditunggu**. Program lanjut mengerjakan baris berikutnya, dan hasil pekerjaan lama itu diurus **nanti** ketika sudah selesai.

Analogi: **pesan makanan di restoran**. Kamu memesan, mendapat nomor, lalu bebas duduk atau main HP. Saat makanan jadi, kamu dipanggil. Kamu tidak berdiri menunggu di depan dapur.

```js
console.log("A: Pesan kopi");

setTimeout(() => {
  console.log("B: Kopi jadi (setelah 2 detik)");
}, 2000);

console.log("C: Sambil menunggu, main HP");
```

Output:

```
A: Pesan kopi
C: Sambil menunggu, main HP
B: Kopi jadi (setelah 2 detik)
```

`C` tercetak **sebelum** `B` walaupun posisinya di bawah. Itu bukan bug, itu memang cara kerja asynchronous.

Operasi yang umumnya asynchronous:

- Timer: `setTimeout`, `setInterval`
- Request jaringan: `fetch`, XMLHttpRequest
- Membaca atau menulis file (Node.js)
- Query database
- Event pengguna (klik, input, dll.)

### Bagaimana Event Loop Bekerja

Urutan prosesnya untuk kode `setTimeout`:

1. `console.log("A...")` masuk Call Stack, dijalankan, keluar.
2. `setTimeout(...)` masuk Call Stack. Timer diserahkan ke Web API / Node API, lalu `setTimeout` keluar dari Call Stack (timer jalan di luar).
3. `console.log("C...")` masuk Call Stack, dijalankan, keluar.
4. Setelah 2 detik, callback timer masuk **Task Queue**.
5. Event Loop melihat Call Stack **kosong**, lalu memindahkan callback ke Call Stack.
6. `console.log("B...")` dijalankan.

Karena itu, **callback asynchronous baru bisa jalan setelah semua kode synchronous yang sedang berjalan selesai**.

### Microtask vs Macrotask

Ada dua antrean, dan **microtask diproses lebih dulu daripada macrotask**:

```js
console.log("1. sync");

setTimeout(() => console.log("4. setTimeout (macrotask)"), 0);

Promise.resolve().then(() => console.log("3. promise (microtask)"));

console.log("2. sync lagi");
```

Output:

```
1. sync
2. sync lagi
3. promise (microtask)
4. setTimeout (macrotask)
```

Urutan prioritas: **kode synchronous, lalu microtask (Promise), lalu macrotask (setTimeout)**.

Catatan: `setTimeout(fn, 0)` **tidak** berarti "jalankan sekarang". Artinya "jalankan secepatnya, tetapi setelah kode synchronous dan microtask selesai".

---

## 3. Perbedaan Synchronous dan Asynchronous

| Aspek | Synchronous | Asynchronous |
|---|---|---|
| Cara eksekusi | Berurutan, satu per satu | Pekerjaan lama dimulai, program lanjut tanpa menunggu |
| Blocking | Ya, baris berikutnya menunggu | Tidak, program tetap berjalan |
| Urutan output | Sesuai urutan penulisan | Bisa berbeda dari urutan penulisan |
| Kemudahan membaca | Sangat mudah | Perlu paham callback, Promise, atau async/await |
| Penanganan error | `try...catch` biasa | Callback error, `.catch()`, atau `try...catch` dengan `await` |
| Cocok untuk | Operasi cepat dan sederhana | Operasi lama: jaringan, file, timer, database |
| Dampak ke UI | Operasi lama membuat UI freeze | UI tetap responsif |
| Contoh | `console.log`, hitungan, `for` biasa | `setTimeout`, `fetch`, `Promise` |

Intinya: **synchronous menunggu hasil, asynchronous tidak menunggu dan hasilnya diurus belakangan.**

---

## 4. Contoh

### Contoh 1: Urutan Eksekusi

```js
console.log("Mulai");

setTimeout(() => {
  console.log("Dari setTimeout");
}, 1000);

console.log("Selesai");
```

Output:

```
Mulai
Selesai
Dari setTimeout
```

### Contoh 2: Synchronous yang Memblokir vs Asynchronous yang Tidak

```js
// Synchronous (memblokir)
function tungguBlocking(ms) {
  const mulai = Date.now();
  while (Date.now() - mulai < ms) {}
}

console.log("Blocking: mulai");
tungguBlocking(1000);
console.log("Blocking: selesai"); // keluar setelah 1 detik, semua tertahan
```

```js
// Asynchronous (tidak memblokir)
console.log("Async: mulai");
setTimeout(() => console.log("Async: callback jalan"), 1000);
console.log("Async: baris ini tidak menunggu"); // keluar langsung
```

### Contoh 3: Simulasi Mengambil Data (Asynchronous)

Fungsi berikut mensimulasikan pengambilan data dari server yang butuh waktu 0,5 detik:

```js
function ambilUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("ID tidak valid"));
        return;
      }
      resolve({ id: id, nama: "Budi" });
    }, 500);
  });
}

async function main() {
  console.log("Mengambil data...");
  const user = await ambilUserPromise(1);
  console.log("Data diterima:", user);
}

main();
```

Output:

```
Mengambil data...
Data diterima: { id: 1, nama: 'Budi' }
```

### Contoh 4: Mengambil Data dari API Sungguhan dengan `fetch`

> Butuh koneksi internet. `fetch` tersedia di browser dan Node.js 18 ke atas.

```js
async function ambilPost(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Judul:", data.title);
  } catch (error) {
    console.error("Gagal mengambil data:", error.message);
  }
}

ambilPost(1);
```

Penjelasan:

- `fetch` mengembalikan Promise, jadi harus di-`await`.
- `response.ok` bernilai `false` untuk status 404, 500, dan sejenisnya. `fetch` **tidak** otomatis error untuk status tersebut, jadi pengecekan manual ini penting.
- `response.json()` juga asynchronous, jadi harus di-`await`.
- `try...catch` menangkap error jaringan maupun error yang kita lempar sendiri.

---

## 5. Tiga Cara Menulis Kode Asynchronous

Ketiga cara ini menyelesaikan masalah yang sama dengan gaya penulisan berbeda. Urutan munculnya dalam sejarah JavaScript: **Callback, lalu Promise, lalu async/await**.

### Cara 1: Callback

**Callback** adalah fungsi yang dikirim sebagai argumen ke fungsi lain, lalu dipanggil ketika pekerjaan selesai.

Konvensi umum (error-first callback): argumen pertama untuk error, argumen kedua untuk hasil.

```js
function ambilUserCallback(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      callback(new Error("ID tidak valid"));
      return;
    }
    callback(null, { id: id, nama: "Budi" });
  }, 500);
}

ambilUserCallback(1, (err, user) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Sukses:", user);
});
```

Output:

```
Sukses: { id: 1, nama: 'Budi' }
```

Kelemahan: kalau ada banyak proses berurutan, kode menjorok makin dalam. Ini disebut **callback hell** (pyramid of doom):

```js
ambilUserCallback(1, (err, user) => {
  if (err) return console.log(err.message);

  ambilUserCallback(2, (err2, user2) => {
    if (err2) return console.log(err2.message);

    ambilUserCallback(3, (err3, user3) => {
      if (err3) return console.log(err3.message);

      console.log("Semua user:", user, user2, user3);
    });
  });
});
```

Susah dibaca, susah dirawat, dan penanganan error harus diulang di setiap level.

### Cara 2: Promise

**Promise** adalah objek yang mewakili hasil dari pekerjaan asynchronous yang **belum selesai sekarang tetapi akan selesai nanti**.

Sebuah Promise punya tiga keadaan:

| State | Arti |
|---|---|
| `pending` | Masih berjalan |
| `fulfilled` | Berhasil (`resolve` dipanggil) |
| `rejected` | Gagal (`reject` dipanggil) |

Membuat dan memakai Promise:

```js
function ambilUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("ID tidak valid"));
        return;
      }
      resolve({ id: id, nama: "Budi" });
    }, 500);
  });
}

ambilUserPromise(1)
  .then((user) => {
    console.log("Sukses:", user);
    return ambilUserPromise(0); // sengaja error
  })
  .catch((err) => {
    console.log("Error:", err.message);
  })
  .finally(() => {
    console.log("Selesai (finally)");
  });
```

Output:

```
Sukses: { id: 1, nama: 'Budi' }
Error: ID tidak valid
Selesai (finally)
```

Penjelasan:

- `.then()` dijalankan saat Promise **berhasil**.
- `.catch()` dijalankan saat ada error di Promise mana pun dalam rantai.
- `.finally()` selalu dijalankan, berhasil atau gagal.
- Di dalam `.then()`, **gunakan `return`** agar langkah berikutnya menunggu hasilnya.

Promise memungkinkan **chaining** yang datar, tidak menjorok seperti callback hell:

```js
ambilUserPromise(1)
  .then((user1) => {
    console.log(user1);
    return ambilUserPromise(2);
  })
  .then((user2) => {
    console.log(user2);
    return ambilUserPromise(3);
  })
  .then((user3) => {
    console.log(user3);
  })
  .catch((err) => {
    console.log("Error:", err.message); // satu catch untuk semua
  });
```

Menjalankan beberapa Promise **sekaligus (paralel)** dengan `Promise.all`:

```js
Promise.all([ambilUserPromise(1), ambilUserPromise(2), ambilUserPromise(3)])
  .then((hasil) => {
    console.log("Semua selesai:", hasil); // array berisi 3 user
  })
  .catch((err) => {
    console.log("Salah satu gagal:", err.message);
  });
```

`Promise.all` gagal total kalau **salah satu** Promise gagal. Kalau ingin menunggu semuanya selesai apa pun hasilnya, pakai `Promise.allSettled`.

### Cara 3: async/await

**async/await** adalah sintaks yang dibangun di atas Promise supaya kode asynchronous **terlihat seperti kode synchronous**.

Aturan:

- `async` di depan fungsi membuat fungsi itu **selalu mengembalikan Promise**.
- `await` hanya boleh dipakai **di dalam fungsi `async`** (atau di top-level pada ES Module).
- `await` menjeda **fungsi itu saja** sampai Promise selesai. Program lain tetap berjalan (tidak memblokir).
- Error ditangani dengan `try...catch...finally`.

```js
async function tampilkanUser() {
  try {
    const user = await ambilUserPromise(1);
    console.log("Sukses:", user);

    await ambilUserPromise(0); // sengaja error
  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    console.log("Selesai (finally)");
  }
}

tampilkanUser();
```

Output:

```
Sukses: { id: 1, nama: 'Budi' }
Error: ID tidak valid
Selesai (finally)
```

**Berurutan vs paralel dengan await:**

```js
async function berurutan() {
  const user1 = await ambilUserPromise(1); // tunggu 0,5 detik
  const user2 = await ambilUserPromise(2); // tunggu 0,5 detik lagi
  console.log(user1, user2); // total sekitar 1 detik
}

async function paralel() {
  const [user1, user2] = await Promise.all([
    ambilUserPromise(1),
    ambilUserPromise(2),
  ]);
  console.log(user1, user2); // total sekitar 0,5 detik
}
```

Kalau dua pekerjaan **tidak saling bergantung**, jalankan paralel dengan `Promise.all` supaya lebih cepat.

### Perbandingan Tiga Cara

| Aspek | Callback | Promise | async/await |
|---|---|---|---|
| Keterbacaan | Menurun dan menjorok jika bersarang | Datar dengan `.then` | Paling mirip kode synchronous |
| Penanganan error | Manual di tiap callback | Satu `.catch()` untuk rantai | `try...catch` |
| Berurutan | Bersarang | Chaining `.then` | Baris `await` berurutan |
| Paralel | Susah | `Promise.all` | `await Promise.all` |
| Kapan dipakai | API lama, event handler | Menggabungkan beberapa Promise | Pilihan utama untuk kode modern |

Rekomendasi: gunakan **async/await** sebagai pilihan utama, tetap pahami Promise karena async/await dibangun di atasnya, dan kenali callback karena masih banyak dipakai di API lama dan event handler.

---

## 6. File Contoh di Repo

Tambahkan file contoh berikut ke repo JS kamu. Isinya mengikuti urutan materi di atas.

Struktur repo yang disarankan:

```
js-notes/
├── README.md                          <- catatan materi (isi dari file .md ini)
├── sync-vs-async.js                   <- file contoh yang dijalankan
└── latihan/
    └── index.html                     <- latihan mengetik sendiri
```

Cara menjalankan (butuh Node.js terpasang):

```bash
node sync-vs-async.js
```

File `sync-vs-async.js` berisi 8 demo yang dijalankan berurutan:

| No | Demo | Terkait bagian |
|---|---|---|
| 1 | Synchronous | Bagian 1 |
| 2 | Synchronous blocking | Bagian 1 |
| 3 | Asynchronous (`setTimeout`) | Bagian 2 |
| 4 | Urutan Event Loop (microtask vs macrotask) | Bagian 2 |
| 5 | Callback | Bagian 5, Cara 1 |
| 6 | Promise | Bagian 5, Cara 2 |
| 7 | async/await | Bagian 5, Cara 3 |
| 8 | Berurutan vs paralel | Bagian 5, Cara 3 |

Output yang diharapkan (angka milidetik di demo 8 bisa bergeser sedikit):

```
=== 1. SYNCHRONOUS ===
1. Bangun tidur
2. Mandi
3. Sarapan

=== 2. SYNCHRONOUS BLOCKING ===
Mulai
Selesai (setelah 1 detik, semua tertahan)

=== 3. ASYNCHRONOUS ===
A: Pesan kopi
C: Sambil menunggu, main HP
B: Kopi jadi (setelah 1 detik)

=== 4. URUTAN EVENT LOOP ===
1. sync
2. sync lagi
3. promise (microtask)
4. setTimeout (macrotask)

=== 5. CALLBACK ===
Sukses: { id: 1, nama: 'Budi' }
Error: ID tidak valid

=== 6. PROMISE ===
Sukses: { id: 1, nama: 'Budi' }
Error: ID tidak valid
Selesai (finally)

=== 7. ASYNC/AWAIT ===
Sukses: { id: 1, nama: 'Budi' }
Error: ID tidak valid
Selesai (finally)

=== 8. BERURUTAN vs PARALEL ===
Berurutan: sekitar 1000 ms
Paralel  : sekitar 500 ms

Semua demo selesai.
```

Bagian yang bisa ditambahkan ke `README.md` repo (ringkasan dan tautan ke contoh):

```md
## Synchronous vs Asynchronous

- Materi lengkap: lihat bagian di atas
- Contoh kode: [`sync-vs-async.js`](./sync-vs-async.js)
- Jalankan dengan: `node sync-vs-async.js`
```

---

## 7. Kesalahan Umum

**1. Lupa `await`**

```js
async function salah() {
  const user = ambilUserPromise(1); // tanpa await
  console.log(user); // Promise { <pending> }, bukan datanya
}

async function benar() {
  const user = await ambilUserPromise(1);
  console.log(user); // { id: 1, nama: 'Budi' }
}
```

**2. `await` di dalam `forEach`**

`forEach` tidak menunggu fungsi `async` di dalamnya, jadi urutan jadi kacau:

```js
async function salah() {
  [1, 2, 3].forEach(async (id) => {
    const user = await ambilUserPromise(id);
    console.log(user);
  });
  console.log("Selesai?"); // tercetak LEBIH DULU, padahal belum selesai
}

async function benar() {
  for (const id of [1, 2, 3]) {
    const user = await ambilUserPromise(id);
    console.log(user);
  }
  console.log("Selesai"); // tercetak setelah semuanya selesai
}
```

Kalau urutan tidak penting dan ingin lebih cepat, pakai `Promise.all` dengan `map`:

```js
async function paralel() {
  const hasil = await Promise.all([1, 2, 3].map((id) => ambilUserPromise(id)));
  console.log(hasil);
}
```

**3. Lupa `return` di dalam `.then()`**

```js
// SALAH: langkah berikutnya tidak menunggu Promise kedua
ambilUserPromise(1)
  .then(() => {
    ambilUserPromise(2); // tidak di-return
  })
  .then((hasil) => console.log(hasil)); // undefined

// BENAR
ambilUserPromise(1)
  .then(() => {
    return ambilUserPromise(2);
  })
  .then((hasil) => console.log(hasil)); // { id: 2, nama: 'Budi' }
```

**4. Tidak menangani error (unhandled rejection)**

Promise yang gagal tanpa `.catch()` atau `try...catch` akan menghasilkan error "unhandled rejection", dan di Node.js modern bisa menghentikan program. Selalu sediakan penanganan error.

```js
async function aman() {
  try {
    await ambilUserPromise(0);
  } catch (err) {
    console.log("Error tertangani:", err.message);
  }
}

aman();
```

**5. Memakai `await` di luar fungsi `async`**

`await` di dalam fungsi biasa menghasilkan `SyntaxError`. Bungkus dengan fungsi `async`, seperti `main()` pada contoh-contoh di atas.

**6. Menganggap `setTimeout(fn, 0)` jalan langsung**

Callback-nya tetap menunggu semua kode synchronous dan microtask selesai (lihat bagian Microtask vs Macrotask).

---

## 8. Ringkasan

- JavaScript single-threaded: satu baris kode dieksekusi pada satu waktu.
- **Synchronous**: berurutan dan memblokir. Baris berikutnya menunggu baris sebelumnya.
- **Asynchronous**: pekerjaan lama dimulai tanpa ditunggu, hasilnya diurus nanti lewat callback, Promise, atau async/await.
- **Event Loop** memindahkan callback dari antrean ke Call Stack saat Call Stack kosong. Microtask (Promise) diproses lebih dulu daripada macrotask (`setTimeout`).
- Tiga cara menulis kode asynchronous: **Callback, Promise, async/await**.
- Pilihan modern: **async/await** dengan `try...catch`, ditambah `Promise.all` untuk pekerjaan paralel.
- Hindari: lupa `await`, `await` di dalam `forEach`, lupa `return` di `.then()`, dan tidak menangani error.