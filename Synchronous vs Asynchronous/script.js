// ============================================================
// sync-vs-async.js
// Contoh Synchronous vs Asynchronous di JavaScript
// Materi lengkap: lihat synchronous-vs-asynchronous.md
//
// Cara menjalankan (butuh Node.js):
//   node sync-vs-async.js
// ============================================================

// ---------- Helper ----------

// Menunggu `ms` milidetik TANPA memblokir program (non-blocking).
const tunggu = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Menunggu `ms` milidetik DENGAN memblokir program (blocking).
// Hanya untuk demo, jangan dipakai di kode sungguhan.
function tungguBlocking(ms) {
  const mulai = Date.now();
  while (Date.now() - mulai < ms) {
    // sengaja kosong: CPU sibuk, tidak ada yang bisa jalan selama ini
  }
}

// ---------- 1. Synchronous ----------
function demoSynchronous() {
  console.log("\n=== 1. SYNCHRONOUS ===");
  console.log("1. Bangun tidur");
  console.log("2. Mandi");
  console.log("3. Sarapan");
}

// ---------- 2. Synchronous yang memblokir ----------
function demoBlocking() {
  console.log("\n=== 2. SYNCHRONOUS BLOCKING ===");
  console.log("Mulai");
  tungguBlocking(1000);
  console.log("Selesai (setelah 1 detik, semua tertahan)");
}

// ---------- 3. Asynchronous ----------
async function demoAsynchronous() {
  console.log("\n=== 3. ASYNCHRONOUS ===");
  console.log("A: Pesan kopi");
  setTimeout(() => console.log("B: Kopi jadi (setelah 1 detik)"), 1000);
  console.log("C: Sambil menunggu, main HP");
  await tunggu(1200); // hanya agar demo berikutnya tidak tercampur
}

// ---------- 4. Urutan Event Loop ----------
async function demoUrutanEventLoop() {
  console.log("\n=== 4. URUTAN EVENT LOOP ===");
  console.log("1. sync");
  setTimeout(() => console.log("4. setTimeout (macrotask)"), 0);
  Promise.resolve().then(() => console.log("3. promise (microtask)"));
  console.log("2. sync lagi");
  await tunggu(50);
}

// ---------- 5. Cara 1: Callback ----------
function ambilUserCallback(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      callback(new Error("ID tidak valid"));
      return;
    }
    callback(null, { id: id, nama: "Budi" });
  }, 500);
}

function demoCallback() {
  console.log("\n=== 5. CALLBACK ===");
  return new Promise((resolve) => {
    ambilUserCallback(1, (err, user) => {
      if (err) {
        console.log("Error:", err.message);
        resolve();
        return;
      }
      console.log("Sukses:", user);

      // callback di dalam callback (cikal bakal "callback hell")
      ambilUserCallback(0, (err2) => {
        if (err2) {
          console.log("Error:", err2.message);
        }
        resolve();
      });
    });
  });
}

// ---------- 6. Cara 2: Promise ----------
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

function demoPromise() {
  console.log("\n=== 6. PROMISE ===");
  return ambilUserPromise(1)
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
}

// ---------- 7. Cara 3: async/await ----------
async function demoAsyncAwait() {
  console.log("\n=== 7. ASYNC/AWAIT ===");
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

// ---------- 8. Berurutan vs Paralel ----------
async function demoParalel() {
  console.log("\n=== 8. BERURUTAN vs PARALEL ===");

  let mulai = Date.now();
  await ambilUserPromise(1);
  await ambilUserPromise(2);
  console.log("Berurutan: sekitar", Math.round((Date.now() - mulai) / 100) * 100, "ms");

  mulai = Date.now();
  await Promise.all([ambilUserPromise(1), ambilUserPromise(2)]);
  console.log("Paralel  : sekitar", Math.round((Date.now() - mulai) / 100) * 100, "ms");
}

// ---------- Runner ----------
async function main() {
  demoSynchronous();
  demoBlocking();
  await demoAsynchronous();
  await demoUrutanEventLoop();
  await demoCallback();
  await demoPromise();
  await demoAsyncAwait();
  await demoParalel();
  console.log("\nSemua demo selesai.");
}

main().catch((err) => {
  console.error("Terjadi error tak terduga:", err);
});