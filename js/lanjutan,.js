// =====================================================
// 1. DATA & MANIPULASI KOLEKSI BUKU (MINI LIBRARY)
// =====================================================

const koleksiBuku = [
  { id: 1, judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", dipinjam: false },
  { id: 2, judul: "Hujan", penulis: "Tere Liye", dipinjam: false },
  { id: 3, judul: "Dilan 1990", penulis: "Pidi Baiq", dipinjam: true },
];

const namaPerpus = document.querySelector("#nama-perpus");
const koleksiEl = document.querySelector("#koleksi-buku");
const jumlahBukuEl = document.querySelector("#jumlah-buku");
const gambarCover = document.querySelector("#gambar-cover");

// Fungsi render daftar buku ke DOM
function renderBuku() {
  const dipinjamCount = koleksiBuku.filter((b) => b.dipinjam).length;
  jumlahBukuEl.textContent = `Total Buku: ${koleksiBuku.length} (Sedang Dipinjam: ${dipinjamCount})`;

  let daftarHTML = "";

  koleksiBuku.forEach((buku) => {
    daftarHTML += `
      <div class="buku-card ${buku.dipinjam ? "sedang-dipinjam" : ""}" data-id="${buku.id}">
        <h3 class="nama-buku">${buku.judul}</h3>
        <p>Penulis: ${buku.penulis}</p>
        <div class="tombol-group">
          <button class="tombol-pinjam" ${buku.dipinjam ? "disabled" : ""}>
            ${buku.dipinjam ? "Sedang Dipinjam" : "Pinjam Buku"}
          </button>
          ${
            buku.dipinjam
              ? `<button class="tombol-kembali">Kembalikan Buku</button>`
              : ""
          }
        </div>
      </div>
    `;
  });

  koleksiEl.innerHTML = daftarHTML;
  pasangAksiBuku();
}

// Fungsi listener untuk Pinjam & Kembalikan Buku
function pasangAksiBuku() {
  const kartuBuku = document.querySelectorAll(".buku-card");

  kartuBuku.forEach((kartu, index) => {
    const buku = koleksiBuku[index];
    const tombolPinjam = kartu.querySelector(".tombol-pinjam");
    const tombolKembali = kartu.querySelector(".tombol-kembali");

    // Event Pinjam Buku
    if (tombolPinjam) {
      tombolPinjam.addEventListener("click", () => {
        buku.dipinjam = true;

        // Perbarui gambar cover
        gambarCover.setAttribute(
          "src",
          `https://via.placeholder.com/120x160?text=${encodeURIComponent(buku.judul)}`
        );
        gambarCover.setAttribute("alt", `Cover buku ${buku.judul}`);

        // Re-render tampilan
        renderBuku();
      });
    }

    // Event Kembalikan Buku
    if (tombolKembali) {
      tombolKembali.addEventListener("click", () => {
        buku.dipinjam = false;

        // Reset gambar cover jika diperlukan
        gambarCover.setAttribute(
          "src",
          "https://via.placeholder.com/120x160?text=Cover+Buku"
        );
        gambarCover.setAttribute("alt", "cover buku");

        // Re-render tampilan
        renderBuku();
      });
    }
  });
}

// Jalankan render awal
renderBuku();


// =====================================================
// 2. EVENT LISTENER: Form Real-time Input & Submit
// =====================================================

const userForm = document.getElementById("userForm");
const usernameInput = document.getElementById("username");
const namePreview = document.getElementById("namePreview");

if (usernameInput && namePreview) {
  usernameInput.addEventListener("input", (event) => {
    const value = event.target.value;
    namePreview.textContent = value.trim() === "" ? "-" : value;
  });
}

if (userForm) {
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (usernameInput.value.trim() === "") {
      alert("Silakan isi nama pengguna terlebih dahulu!");
      return;
    }
    alert(`Form berhasil dikirim! Nama: ${usernameInput.value}`);
  });
}


// =====================================================
// 3. MEMBUAT & MENGHAPUS ELEMEN
// =====================================================

const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");

if (addBtn && itemInput && itemList) {
  addBtn.addEventListener("click", () => {
    const text = itemInput.value.trim();
    if (text === "") return alert("Teks tidak boleh kosong!");

    // Tambah ke array koleksiBuku
    const bukuBaru = {
      id: koleksiBuku.length + 1,
      judul: text,
      penulis: "Penulis Anonim",
      dipinjam: false,
    };
    koleksiBuku.push(bukuBaru);
    renderBuku(); // Re-render daftar buku utama

    // Menambahkan elemen ke daftar <ul> tambahan
    const li = document.createElement("li");
    li.textContent = text + " ";
    li.style.margin = "5px 0";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(deleteBtn);
    itemList.appendChild(li);

    itemInput.value = "";
  });
}


// =====================================================
// 4. EVENT BUBBLING & stopPropagation()
// =====================================================

const parentBox = document.getElementById("parentBox");
const normalBtn = document.getElementById("normalBtn");
const stoppedBtn = document.getElementById("stoppedBtn");
const logBox = document.getElementById("logBox");

if (parentBox && normalBtn && stoppedBtn && logBox) {
  parentBox.addEventListener("click", () => {
    logBox.textContent = ">>> Parent Box Ikut Terpicu! (Bubbling) <<<";
  });

  normalBtn.addEventListener("click", () => {
    logBox.textContent = "Tombol Normal diklik.";
  });

  stoppedBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    logBox.textContent = "Tombol stopPropagation diklik. (Parent TIDAK terpicu)";
  });
}