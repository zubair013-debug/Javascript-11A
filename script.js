//Data buku yang tersedia di perpustakaan
const koleksiBuku = [
  {
    id: 1,
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    dipinjam: false,
  },
  {
    id: 2,
    judul: "Hujan",
    penulis: "Tere Liye",
    dipinjam: false,
  },
  {
    id: 3,
    judul: "Dilan 1990",
    penulis: "Pidi Baiq",
    dipinjam: true,
  },
];

// =====================================================
// 1. Mengambil elemen dengan querySelector
// =====================================================

const namaPerpus = document.querySelector("#nama-perpus");
const koleksiEl = document.querySelector("#koleksi-buku");
const jumlahBukuEl = document.querySelector("#jumlah-buku");
const gambarCover = document.querySelector("#gambar-cover");

// =====================================================
// 2. textContent dan innerHTML
// =====================================================

// Menampilkan jumlah buku
jumlahBukuEl.textContent = `Jumlah Buku: ${koleksiBuku.length}`;

// Membuat daftar buku
let daftarHTML = "";

koleksiBuku.forEach((buku) => {
  daftarHTML += `
        <div class="buku-card" data-id="${buku.id}">
            <h3 class="nama-buku">${buku.judul}</h3>
            <p>Penulis: ${buku.penulis}</p>
            <button class="tombol-pinjam">Pinjam Buku</button>
        </div>
    `;
});

koleksiEl.innerHTML = daftarHTML;

// Mengambil semua kartu dan tombol
const kartuBuku = document.querySelectorAll(".buku-card");
const tombolPinjam = document.querySelectorAll(".tombol-pinjam");

// Contoh innerText
console.log("Nama perpustakaan:", namaPerpus.innerText);

// =====================================================
// 3. Manipulasi atribut, class dan style
// =====================================================

tombolPinjam.forEach((tombol, index) => {
  const buku = koleksiBuku[index];
  const kartu = kartuBuku[index];

  // Jika buku sudah dipinjam
  if (buku.dipinjam === true) {
    tombol.setAttribute("disabled", true);
    tombol.textContent = "Sedang Dipinjam";
    kartu.classList.add("sedang-dipinjam");
  }

  // Ketika tombol ditekan
  tombol.addEventListener("click", function () {
    // Menampilkan src gambar sebelumnya
    console.log("Cover sebelumnya:", gambarCover.getAttribute("src"));

    // Mengganti gambar cover
    gambarCover.setAttribute("src", `https://via.placeholder.com/120x150?text=${buku.judul}`);

    gambarCover.setAttribute("alt", `Cover buku ${buku.judul}`);

    // Memberikan perubahan visual pada kartu
    kartu.style.backgroundColor = "#ffe1e1";
    kartu.style.border = "2px solid #e05555";
    kartu.style.transform = "scale(0.98)";

    // Mengubah status tombol
    tombol.setAttribute("disabled", true);
    tombol.textContent = "Sudah Dipinjam";

    // Mengubah informasi di halaman
    jumlahBukuEl.textContent = `"${buku.judul}" sedang dipinjam`;
  });
});