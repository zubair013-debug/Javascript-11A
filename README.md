# Belajar Dasar DOM JavaScript

Repository ini berisi catatan pembelajaran dasar **DOM (Document Object Model)** pada JavaScript, khususnya tentang pemilihan elemen, perubahan konten, serta manipulasi atribut dan style.

## Pengertian DOM

DOM atau **Document Object Model** adalah representasi dokumen HTML dalam bentuk objek yang dapat diakses oleh JavaScript.

Saat browser membaca halaman HTML, setiap elemen seperti `<h1>`, `<p>`, `<button>`, `<div>`, dan `<img>` direpresentasikan sebagai objek di dalam DOM. JavaScript dapat menggunakan objek tersebut untuk membaca, menambah, mengubah, atau menghapus bagian halaman secara dinamis.

Dengan DOM, JavaScript dapat melakukan hal-hal seperti:

- Mengambil elemen HTML berdasarkan `id`, `class`, nama tag, atau selector CSS lainnya.
- Mengubah teks pada halaman.
- Menambahkan elemen HTML baru.
- Mengubah atribut HTML.
- Mengubah tampilan CSS.
- Merespons interaksi pengguna, seperti klik tombol atau input pada form.

## 1. querySelector dan querySelectorAll

### `querySelector()`

`querySelector()` adalah method untuk memilih **satu elemen pertama** yang sesuai dengan selector CSS.

Sintaks:

```javascript
document.querySelector("selector");
```

Contoh:

```javascript
const judul = document.querySelector("#judul");
```

Kode tersebut mencari elemen pertama yang memiliki `id="judul"`.

Contoh selector yang dapat digunakan:

```javascript
document.querySelector("#id-elemen");
document.querySelector(".nama-class");
document.querySelector("p");
document.querySelector("button");
document.querySelector("input[type='text']");
```

Jika elemen ditemukan, hasilnya berupa objek elemen HTML. Jika tidak ditemukan, hasilnya adalah `null`.

Contoh pengecekan:

```javascript
const tombol = document.querySelector("#tombol-simpan");

if (tombol) {
  console.log("Tombol ditemukan");
}
```

`querySelector()` digunakan ketika hanya membutuhkan satu elemen tertentu, misalnya:

- Satu judul halaman.
- Satu tombol simpan.
- Satu input pencarian.
- Satu area notifikasi.
- Satu elemen menu.

`querySelector()` mengembalikan elemen pertama yang cocok dengan selector yang diberikan. [2]

### `querySelectorAll()`

`querySelectorAll()` adalah method untuk memilih **semua elemen** yang sesuai dengan selector CSS.

Sintaks:

```javascript
document.querySelectorAll("selector");
```

Contoh:

```javascript
const semuaParagraf = document.querySelectorAll("p");
```

Kode tersebut mengambil semua elemen `<p>` yang terdapat pada halaman.

Contoh lain:

```javascript
const semuaTombol = document.querySelectorAll(".btn");
```

Kode tersebut mengambil semua elemen yang memiliki class `btn`.

Hasil dari `querySelectorAll()` berupa `NodeList`, yaitu kumpulan elemen yang dapat diakses menggunakan perulangan seperti `forEach()`.

```javascript
const semuaTombol = document.querySelectorAll(".btn");

semuaTombol.forEach((tombol) => {
  console.log(tombol);
});
```

Contoh mengubah teks semua elemen:

```javascript
const semuaItem = document.querySelectorAll(".item");

semuaItem.forEach((item) => {
  item.textContent = "Data telah diperbarui";
});
```

`querySelectorAll()` cocok digunakan ketika ingin memanipulasi banyak elemen, misalnya:

- Semua card produk.
- Semua tombol.
- Semua item daftar.
- Semua gambar.
- Semua elemen dengan class yang sama.

`querySelectorAll()` menghasilkan `NodeList` statis, sehingga daftar hasil yang sudah diambil tidak otomatis berubah ketika elemen baru ditambahkan setelah method dipanggil. [1][3]

### Perbedaan `querySelector()` dan `querySelectorAll()`

| Aspek | `querySelector()` | `querySelectorAll()` |
|---|---|---|
| Jumlah elemen yang diambil | Satu elemen pertama | Semua elemen yang cocok |
| Hasil | `Element` atau `null` | `NodeList` |
| Cocok untuk | Satu tombol, satu judul, satu input | Banyak item, banyak tombol, banyak card |
| Contoh | `document.querySelector("#judul")` | `document.querySelectorAll(".item")` |

## 2. innerHTML, textContent, dan innerText

`innerHTML`, `textContent`, dan `innerText` adalah properti yang digunakan untuk mengambil atau mengubah isi sebuah elemen HTML.

Walaupun terlihat mirip, ketiganya memiliki fungsi yang berbeda.

### `innerHTML`

`innerHTML` digunakan untuk membaca atau mengubah isi elemen dalam bentuk **HTML**.

Contoh:

```javascript
const container = document.querySelector("#container");

container.innerHTML = "<h2>Judul Baru</h2><p>Ini adalah paragraf baru.</p>";
```

Pada contoh tersebut, string HTML akan diproses oleh browser dan ditampilkan sebagai elemen `<h2>` serta `<p>`.

Contoh hasil:

```html
<div id="container">
  <h2>Judul Baru</h2>
  <p>Ini adalah paragraf baru.</p>
</div>
```

`innerHTML` dapat digunakan ketika ingin:

- Menambahkan struktur HTML baru.
- Menampilkan card atau daftar item.
- Membuat tombol atau elemen secara dinamis.
- Mengganti seluruh isi suatu container.

Contoh:

```javascript
const daftar = document.querySelector("#daftar");

daftar.innerHTML = `
  <li>Item pertama</li>
  <li>Item kedua</li>
  <li>Item ketiga</li>
`;
```

Perlu berhati-hati ketika menggunakan `innerHTML` dengan input dari pengguna. Data yang tidak divalidasi dapat memasukkan kode HTML yang tidak diinginkan. Untuk menampilkan teks biasa dari pengguna, gunakan `textContent`.

### `textContent`

`textContent` digunakan untuk membaca atau mengubah isi elemen sebagai **teks biasa**.

Contoh:

```javascript
const pesan = document.querySelector("#pesan");

pesan.textContent = "Data berhasil disimpan.";
```

Jika nilai yang dimasukkan berisi tag HTML, tag tersebut tidak akan dijalankan sebagai HTML.

```javascript
pesan.textContent = "<strong>Data berhasil disimpan.</strong>";
```

Hasil yang tampil pada halaman:

```text
<strong>Data berhasil disimpan.</strong>
```

`textContent` cocok digunakan untuk:

- Menampilkan notifikasi.
- Menampilkan status.
- Mengubah judul.
- Menampilkan jumlah data.
- Menampilkan teks dari input pengguna.
- Mengubah isi tombol.

Contoh:

```javascript
const jumlahData = document.querySelector("#jumlah-data");

jumlahData.textContent = "Jumlah data: 10";
```

### `innerText`

`innerText` juga digunakan untuk mengambil atau mengubah teks dari sebuah elemen.

Contoh:

```javascript
const judul = document.querySelector("h1");

console.log(judul.innerText);
```

Perbedaan utama `innerText` dan `textContent` adalah bahwa `innerText` berfokus pada teks yang benar-benar terlihat pada halaman.

Jika suatu elemen disembunyikan menggunakan CSS, misalnya:

```css
display: none;
```

teks di dalam elemen tersebut biasanya tidak akan ikut terbaca oleh `innerText`. Sebaliknya, `textContent` tetap dapat membaca teks tersebut.

### Perbedaan `innerHTML`, `textContent`, dan `innerText`

| Properti | Fungsi | HTML diproses | Memperhatikan elemen tersembunyi |
|---|---|---:|---:|
| `innerHTML` | Membaca atau mengubah isi dalam bentuk HTML | Ya | Tidak menjadi fokus |
| `textContent` | Membaca atau mengubah teks biasa | Tidak | Ya, teks tetap terbaca |
| `innerText` | Membaca atau mengubah teks yang terlihat | Tidak | Tidak, hanya teks yang terlihat |

Contoh sederhana:

```html
<p id="contoh">
  Teks terlihat
  <span style="display: none;">Teks tersembunyi</span>
</p>
```

```javascript
const contoh = document.querySelector("#contoh");

console.log(contoh.innerHTML);
console.log(contoh.textContent);
console.log(contoh.innerText);
```

Secara konsep:

```text
innerHTML    : Teks terlihat <span style="display: none;">Teks tersembunyi</span>
textContent  : Teks terlihat Teks tersembunyi
innerText    : Teks terlihat
```

`textContent` merepresentasikan isi teks sebuah node dan turunannya, sedangkan `innerText` merepresentasikan teks yang dirender atau terlihat pada halaman. [6][7]

## 3. Manipulasi Atribut dan Style

### Pengertian atribut

Atribut adalah informasi tambahan yang terdapat pada elemen HTML.

Contoh:

```html
<img src="gambar.jpg" alt="Contoh gambar" />
<a href="[https://example.com](https://example.com)">Kunjungi Website</a>
<input type="text" placeholder="Masukkan nama" />
<button disabled>Kirim</button>
```

Beberapa contoh atribut HTML:

| Atribut | Fungsi |
|---|---|
| `id` | Memberikan identitas unik pada elemen |
| `class` | Memberikan nama class CSS pada elemen |
| `src` | Menentukan sumber file, biasanya pada gambar atau video |
| `href` | Menentukan tujuan link |
| `alt` | Menentukan teks alternatif untuk gambar |
| `disabled` | Menonaktifkan input atau tombol |
| `placeholder` | Menampilkan petunjuk pada input |
| `title` | Menampilkan informasi tambahan saat elemen diarahkan cursor |

### `getAttribute()`

`getAttribute()` digunakan untuk mengambil nilai dari suatu atribut.

Sintaks:

```javascript
element.getAttribute("nama-atribut");
```

Contoh:

```javascript
const gambar = document.querySelector("img");

const sumberGambar = gambar.getAttribute("src");

console.log(sumberGambar);
```

Kode tersebut mengambil nilai atribut `src` dari elemen gambar.

### `setAttribute()`

`setAttribute()` digunakan untuk menambahkan atribut baru atau mengubah nilai atribut yang sudah ada.

Sintaks:

```javascript
element.setAttribute("nama-atribut", "nilai-atribut");
```

Contoh:

```javascript
const tombol = document.querySelector("button");

tombol.setAttribute("disabled", "true");
```

Kode tersebut menambahkan atribut `disabled` pada tombol, sehingga tombol tidak dapat diklik.

Contoh mengubah atribut gambar:

```javascript
const gambar = document.querySelector("img");

gambar.setAttribute("src", "gambar-baru.jpg");
gambar.setAttribute("alt", "Gambar baru");
```

Contoh mengubah placeholder input:

```javascript
const input = document.querySelector("input");

input.setAttribute("placeholder", "Masukkan email");
```

### `removeAttribute()`

`removeAttribute()` digunakan untuk menghapus atribut dari sebuah elemen.

Sintaks:

```javascript
element.removeAttribute("nama-atribut");
```

Contoh:

```javascript
const tombol = document.querySelector("button");

tombol.removeAttribute("disabled");
```

Kode tersebut menghapus atribut `disabled`, sehingga tombol dapat diklik kembali.

### Manipulasi style langsung

JavaScript dapat mengubah tampilan CSS elemen menggunakan properti `style`.

Contoh:

```javascript
const kotak = document.querySelector(".box");

kotak.style.backgroundColor = "blue";
kotak.style.color = "white";
kotak.style.padding = "15px";
kotak.style.borderRadius = "8px";
```

Perubahan tersebut setara dengan CSS berikut:

```css
.box {
  background-color: blue;
  color: white;
  padding: 15px;
  border-radius: 8px;
}
```

Namun, ketika menulis CSS melalui JavaScript, nama properti menggunakan format `camelCase`.

| CSS | JavaScript |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `text-align` | `textAlign` |
| `border-radius` | `borderRadius` |
| `margin-top` | `marginTop` |

Contoh lain:

```javascript
const judul = document.querySelector("h1");

judul.style.color = "darkblue";
judul.style.fontSize = "32px";
judul.style.textAlign = "center";
```

### Manipulasi class dengan `classList`

Selain menggunakan `style` secara langsung, cara yang lebih rapi untuk mengubah tampilan adalah menggunakan `classList`.

Method yang sering digunakan:

| Method | Fungsi |
|---|---|
| `classList.add()` | Menambahkan class |
| `classList.remove()` | Menghapus class |
| `classList.toggle()` | Menambah atau menghapus class secara bergantian |
| `classList.contains()` | Memeriksa apakah elemen memiliki class tertentu |

Contoh:

```javascript
const kotak = document.querySelector(".box");

kotak.classList.add("aktif");
```

Jika terdapat CSS berikut:

```css
.aktif {
  background-color: green;
  color: white;
}
```

Maka elemen `kotak` akan memiliki tampilan sesuai class `aktif`.

Contoh menghapus class:

```javascript
kotak.classList.remove("aktif");
```

Contoh toggle class:

```javascript
kotak.classList.toggle("aktif");
```

`toggle()` berguna untuk fitur seperti:

- Mode gelap dan mode terang.
- Menampilkan atau menyembunyikan menu.
- Memberi tanda elemen yang aktif.
- Mengubah status tombol.
- Membuka dan menutup modal.

## Kesimpulan

DOM memungkinkan JavaScript berinteraksi dengan elemen HTML secara dinamis.

Materi penting yang dipelajari adalah:

- `querySelector()` digunakan untuk memilih satu elemen pertama yang sesuai dengan selector.
- `querySelectorAll()` digunakan untuk memilih seluruh elemen yang sesuai dengan selector.
- `innerHTML` digunakan untuk memasukkan atau mengambil isi dalam bentuk HTML.
- `textContent` digunakan untuk memasukkan atau mengambil teks biasa.
- `innerText` digunakan untuk mengambil teks yang terlihat pada halaman.
- `getAttribute()` digunakan untuk mengambil nilai atribut.
- `setAttribute()` digunakan untuk menambah atau mengubah atribut.
- `removeAttribute()` digunakan untuk menghapus atribut.
- `style` digunakan untuk mengubah CSS secara langsung melalui JavaScript.
- `classList` digunakan untuk menambah, menghapus, atau mengatur class CSS elemen.

## 4. Membuat dan Menghapus Elemen

Selain mengubah elemen yang sudah ada, JavaScript juga dapat digunakan untuk membuat elemen HTML baru, menambahkannya ke halaman, serta menghapus elemen yang tidak diperlukan.

### `document.createElement()`

`document.createElement()` digunakan untuk membuat elemen HTML baru melalui JavaScript.

Sintaks:

```javascript
document.createElement("nama-tag");
```

Contoh membuat elemen paragraf:

```javascript
const paragrafBaru = document.createElement("p");

paragrafBaru.textContent = "Ini adalah paragraf baru.";
```

Pada kode tersebut, elemen `<p>` sudah dibuat, tetapi belum tampil di halaman karena belum dimasukkan ke dalam DOM.

### `appendChild()`

`appendChild()` digunakan untuk menambahkan elemen baru sebagai anak dari elemen lain.

Sintaks:

```javascript
parent.appendChild(child);
```

Contoh:

```javascript
const container = document.querySelector("#container");

const paragrafBaru = document.createElement("p");
paragrafBaru.textContent = "Paragraf ini dibuat dengan JavaScript.";

container.appendChild(paragrafBaru);
```

Hasilnya, elemen `<p>` baru akan dimasukkan ke dalam elemen dengan `id="container"`.

Contoh HTML awal:

```html
<div id="container"></div>
```

Setelah JavaScript dijalankan, hasilnya menjadi:

```html
<div id="container">
  <p>Paragraf ini dibuat dengan JavaScript.</p>
</div>
```

### Menambahkan atribut dan class pada elemen baru

Elemen yang baru dibuat juga dapat diberi atribut, class, atau style sebelum dimasukkan ke halaman.

Contoh:

```javascript
const daftar = document.querySelector("#daftar");

const itemBaru = document.createElement("li");

itemBaru.textContent = "Belajar DOM JavaScript";
itemBaru.classList.add("item");
itemBaru.setAttribute("title", "Materi DOM");

daftar.appendChild(itemBaru);
```

Contoh HTML awal:

```html
<ul id="daftar"></ul>
```

Hasil setelah kode dijalankan:

```html
<ul id="daftar">
  <li class="item" title="Materi DOM">Belajar DOM JavaScript</li>
</ul>
```

### `append()`

Selain `appendChild()`, terdapat method `append()` untuk menambahkan node atau teks ke dalam elemen.

Contoh:

```javascript
const container = document.querySelector("#container");

const judul = document.createElement("h2");
judul.textContent = "Judul Baru";

container.append(judul);
```

Perbedaan sederhana antara `appendChild()` dan `append()`:

| Method | Fungsi |
|---|---|
| `appendChild()` | Menambahkan satu node atau elemen |
| `append()` | Dapat menambahkan node, elemen, atau teks biasa |

Contoh `append()` dengan teks:

```javascript
const container = document.querySelector("#container");

container.append("Teks tambahan");
```

### `prepend()`

`prepend()` digunakan untuk menambahkan elemen atau teks pada bagian awal sebuah parent element.

Contoh:

```javascript
const daftar = document.querySelector("#daftar");

const itemPertama = document.createElement("li");
itemPertama.textContent = "Item paling atas";

daftar.prepend(itemPertama);
```

Jika sebelumnya daftar sudah memiliki beberapa item, item baru tersebut akan muncul di posisi paling awal.

### `remove()`

`remove()` digunakan untuk menghapus elemen langsung dari DOM.

Contoh:

```javascript
const pesan = document.querySelector("#pesan");

pesan.remove();
```

Kode tersebut akan menghapus elemen yang memiliki `id="pesan"` dari halaman.

Contoh HTML:

```html
<p id="pesan">Pesan ini akan dihapus.</p>
```

Setelah `pesan.remove()` dijalankan, elemen tersebut tidak lagi ada di halaman.

### Contoh membuat dan menghapus item daftar

HTML:

```html
<input type="text" id="input-item" placeholder="Masukkan nama item" />
<button id="tambah-item">Tambah Item</button>

<ul id="daftar-item"></ul>
```

JavaScript:

```javascript
const inputItem = document.querySelector("#input-item");
const tombolTambah = document.querySelector("#tambah-item");
const daftarItem = document.querySelector("#daftar-item");

tombolTambah.addEventListener("click", () => {
  const teksItem = inputItem.value;

  if (teksItem === "") {
    return;
  }

  const itemBaru = document.createElement("li");
  itemBaru.textContent = teksItem;

  daftarItem.appendChild(itemBaru);

  inputItem.value = "";
});
```

Pada contoh tersebut:

- Pengguna menulis teks pada input.
- Saat tombol diklik, JavaScript membuat elemen `<li>` baru.
- Isi `<li>` diambil dari nilai input.
- Elemen `<li>` ditambahkan ke dalam `<ul>`.
- Input dikosongkan kembali setelah item berhasil ditambahkan.

Contoh menambahkan tombol hapus pada setiap item:

```javascript
const inputItem = document.querySelector("#input-item");
const tombolTambah = document.querySelector("#tambah-item");
const daftarItem = document.querySelector("#daftar-item");

tombolTambah.addEventListener("click", () => {
  const teksItem = inputItem.value;

  if (teksItem === "") {
    return;
  }

  const itemBaru = document.createElement("li");
  const tombolHapus = document.createElement("button");

  itemBaru.textContent = teksItem;

  tombolHapus.textContent = "Hapus";

  tombolHapus.addEventListener("click", () => {
    itemBaru.remove();
  });

  itemBaru.appendChild(tombolHapus);
  daftarItem.appendChild(itemBaru);

  inputItem.value = "";
});
```

Dengan kode tersebut, setiap item yang dibuat akan memiliki tombol `Hapus`. Saat tombol tersebut diklik, item terkait akan dihapus dari halaman.

## 5. Event Listener: `click`, `input`, dan `submit`

Event adalah kejadian yang terjadi pada halaman web, baik karena tindakan pengguna maupun proses dari browser.

Contoh event:

- Pengguna mengklik tombol.
- Pengguna mengetik pada input.
- Pengguna mengirim form.
- Mouse diarahkan ke elemen tertentu.
- Halaman selesai dimuat.
- Tombol keyboard ditekan.

JavaScript dapat mendeteksi event menggunakan `addEventListener()`.

### `addEventListener()`

Sintaks dasar:

```javascript
element.addEventListener("nama-event", function () {
  // kode yang dijalankan saat event terjadi
});
```

Contoh:

```javascript
const tombol = document.querySelector("#tombol");

tombol.addEventListener("click", () => {
  console.log("Tombol diklik");
});
```

Ketika tombol dengan `id="tombol"` diklik, pesan akan tampil di console browser.

### Event `click`

Event `click` terjadi ketika pengguna mengklik elemen, misalnya tombol, gambar, link, atau card.

Contoh HTML:

```html
<button id="tombol-ubah">Ubah Warna</button>

<p id="pesan">Warna belum diubah.</p>
```

JavaScript:

```javascript
const tombolUbah = document.querySelector("#tombol-ubah");
const pesan = document.querySelector("#pesan");

tombolUbah.addEventListener("click", () => {
  pesan.textContent = "Warna berhasil diubah.";
  pesan.style.color = "green";
});
```

Saat tombol diklik, teks paragraf akan berubah dan warnanya menjadi hijau.

Contoh toggle class dengan event `click`:

```html
<button id="tombol-mode">Ubah Mode</button>

<div class="box" id="kotak">
  Isi kotak
</div>
```

```css
.dark-mode {
  background-color: #222;
  color: white;
}
```

```javascript
const tombolMode = document.querySelector("#tombol-mode");
const kotak = document.querySelector("#kotak");

tombolMode.addEventListener("click", () => {
  kotak.classList.toggle("dark-mode");
});
```

Setiap kali tombol diklik, class `dark-mode` akan ditambahkan atau dihapus dari elemen `kotak`.

### Object event

Saat event terjadi, JavaScript dapat menerima informasi tentang event tersebut melalui parameter `event`.

Contoh:

```javascript
const tombol = document.querySelector("#tombol");

tombol.addEventListener("click", (event) => {
  console.log(event);
});
```

Object `event` berisi informasi seperti:

- Elemen yang memicu event.
- Jenis event yang terjadi.
- Posisi mouse untuk event tertentu.
- Tombol keyboard yang ditekan.
- Informasi form yang dikirim.

Untuk mengetahui elemen yang memicu event, gunakan `event.target`.

```javascript
const tombol = document.querySelector("#tombol");

tombol.addEventListener("click", (event) => {
  console.log(event.target);
});
```

### Event `input`

Event `input` terjadi ketika nilai pada elemen input berubah.

Event ini biasanya digunakan pada elemen seperti:

- `<input>`
- `<textarea>`
- `<select>`

Contoh HTML:

```html
<input type="text" id="nama" placeholder="Masukkan nama" />

<p id="hasil"></p>
```

JavaScript:

```javascript
const inputNama = document.querySelector("#nama");
const hasil = document.querySelector("#hasil");

inputNama.addEventListener("input", () => {
  hasil.textContent = `Halo, ${inputNama.value}`;
});
```

Ketika pengguna mengetik pada input, teks pada elemen `hasil` akan berubah secara langsung.

Contoh validasi panjang karakter:

```html
<input type="text" id="username" placeholder="Masukkan username" />

<p id="info-username"></p>
```

```javascript
const username = document.querySelector("#username");
const infoUsername = document.querySelector("#info-username");

username.addEventListener("input", () => {
  const jumlahKarakter = username.value.length;

  infoUsername.textContent = `Jumlah karakter: ${jumlahKarakter}`;
});
```

Event `input` sangat berguna untuk:

- Menampilkan preview teks secara langsung.
- Menghitung jumlah karakter.
- Membuat fitur pencarian langsung.
- Memvalidasi data saat pengguna mengetik.
- Mengaktifkan atau menonaktifkan tombol berdasarkan input.

### Event `submit`

Event `submit` terjadi ketika pengguna mengirim sebuah form.

Contoh HTML:

```html
<form id="form-nama">
  <input type="text" id="input-nama" placeholder="Masukkan nama" />
  <button type="submit">Kirim</button>
</form>

<p id="hasil-form"></p>
```

JavaScript:

```javascript
const formNama = document.querySelector("#form-nama");
const inputNama = document.querySelector("#input-nama");
const hasilForm = document.querySelector("#hasil-form");

formNama.addEventListener("submit", (event) => {
  event.preventDefault();

  hasilForm.textContent = `Data berhasil dikirim: ${inputNama.value}`;
});
```

Secara default, ketika form dikirim, browser biasanya akan memuat ulang halaman atau berpindah ke alamat yang ditentukan oleh atribut `action`.

Method `event.preventDefault()` digunakan untuk mencegah perilaku default tersebut.

```javascript
event.preventDefault();
```

Dengan `preventDefault()`, JavaScript dapat memproses data form tanpa halaman dimuat ulang.

Contoh validasi form sederhana:

```html
<form id="form-login">
  <input type="text" id="email" placeholder="Masukkan email" />
  <input type="password" id="password" placeholder="Masukkan password" />
  <button type="submit">Login</button>
</form>

<p id="pesan-login"></p>
```

```javascript
const formLogin = document.querySelector("#form-login");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const pesanLogin = document.querySelector("#pesan-login");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  if (email.value === "" || password.value === "") {
    pesanLogin.textContent = "Email dan password wajib diisi.";
    pesanLogin.style.color = "red";
    return;
  }

  pesanLogin.textContent = "Form berhasil dikirim.";
  pesanLogin.style.color = "green";
});
```

Pada contoh tersebut:

- Form tidak akan me-refresh halaman karena menggunakan `preventDefault()`.
- JavaScript memeriksa apakah input email dan password kosong.
- Jika masih kosong, tampil pesan error.
- Jika semua input terisi, tampil pesan berhasil.

### Perbedaan `click`, `input`, dan `submit`

| Event | Terjadi ketika | Contoh penggunaan |
|---|---|---|
| `click` | Elemen diklik | Tombol, card, gambar, menu |
| `input` | Nilai input berubah | Live search, jumlah karakter, preview teks |
| `submit` | Form dikirim | Login, registrasi, tambah data |

## 6. Event Bubbling dan `stopPropagation()`

### Pengertian event bubbling

Event bubbling adalah proses ketika sebuah event terjadi pada elemen anak, lalu event tersebut juga dapat diteruskan ke elemen parent atau elemen pembungkusnya.

Dengan kata lain, event bergerak dari elemen paling dalam menuju elemen luar.

Contoh struktur HTML:

```html
<div id="parent">
  <button id="child">Klik Saya</button>
</div>
```

JavaScript:

```javascript
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener("click", () => {
  console.log("Parent diklik");
});

child.addEventListener("click", () => {
  console.log("Button diklik");
});
```

Jika tombol diklik, hasil pada console adalah:

```text
Button diklik
Parent diklik
```

Hal tersebut terjadi karena event `click` pertama kali dijalankan pada elemen tombol, kemudian event tersebut naik ke elemen parent.

### Ilustrasi event bubbling

Struktur elemen:

```html
<div id="luar">
  <div id="tengah">
    <button id="dalam">Klik</button>
  </div>
</div>
```

Jika semua elemen memiliki event `click`:

```javascript
const luar = document.querySelector("#luar");
const tengah = document.querySelector("#tengah");
const dalam = document.querySelector("#dalam");

luar.addEventListener("click", () => {
  console.log("Elemen luar diklik");
});

tengah.addEventListener("click", () => {
  console.log("Elemen tengah diklik");
});

dalam.addEventListener("click", () => {
  console.log("Tombol diklik");
});
```

Saat tombol diklik, hasilnya:

```text
Tombol diklik
Elemen tengah diklik
Elemen luar diklik
```

Urutan tersebut menunjukkan bahwa event bergerak dari elemen anak ke parent, lalu ke parent yang lebih luar.

### `event.target` dan `event.currentTarget`

Pada event bubbling, penting untuk memahami perbedaan `event.target` dan `event.currentTarget`.

- `event.target` adalah elemen yang benar-benar diklik atau memicu event.
- `event.currentTarget` adalah elemen yang sedang menjalankan event listener.

Contoh:

```html
<div id="container">
  <button id="tombol">Klik Saya</button>
</div>
```

```javascript
const container = document.querySelector("#container");

container.addEventListener("click", (event) => {
  console.log("Target:", event.target);
  console.log("Current target:", event.currentTarget);
});
```

Jika pengguna mengklik tombol:

- `event.target` akan merujuk ke elemen `<button>`.
- `event.currentTarget` akan merujuk ke elemen `<div id="container">`.

### `stopPropagation()`

`stopPropagation()` digunakan untuk menghentikan event bubbling.

Sintaks:

```javascript
event.stopPropagation();
```

Contoh:

```html
<div id="parent">
  <button id="child">Klik Saya</button>
</div>
```

```javascript
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener("click", () => {
  console.log("Parent diklik");
});

child.addEventListener("click", (event) => {
  event.stopPropagation();

  console.log("Button diklik");
});
```

Jika tombol diklik, hasilnya hanya:

```text
Button diklik
```

Pesan `Parent diklik` tidak muncul karena event dari tombol tidak diteruskan ke parent.

### Contoh penggunaan pada modal

Event bubbling sering digunakan pada fitur modal.

Contoh HTML:

```html
<div id="modal">
  <div id="isi-modal">
    <h2>Judul Modal</h2>
    <p>Isi modal berada di sini.</p>
    <button id="tutup-modal">Tutup</button>
  </div>
</div>
```

Contoh CSS:

```css
#modal {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px;
}

#isi-modal {
  background-color: white;
  padding: 20px;
}
```

JavaScript:

```javascript
const modal = document.querySelector("#modal");
const isiModal = document.querySelector("#isi-modal");
const tombolTutup = document.querySelector("#tutup-modal");

modal.addEventListener("click", () => {
  modal.style.display = "none";
});

isiModal.addEventListener("click", (event) => {
  event.stopPropagation();
});

tombolTutup.addEventListener("click", () => {
  modal.style.display = "none";
});
```

Cara kerja kode tersebut:

- Jika pengguna mengklik area luar modal, modal ditutup.
- Jika pengguna mengklik isi modal, event tidak diteruskan ke area luar karena menggunakan `stopPropagation()`.
- Jika pengguna mengklik tombol tutup, modal akan ditutup.

### Event delegation

Event bubbling juga dapat dimanfaatkan untuk menangani banyak elemen menggunakan satu event listener. Teknik ini disebut event delegation.

Contoh HTML:

```html
<ul id="daftar-menu">
  <li>Beranda</li>
  <li>Profil</li>
  <li>Kontak</li>
</ul>
```

JavaScript:

```javascript
const daftarMenu = document.querySelector("#daftar-menu");

daftarMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log(`Menu yang diklik: ${event.target.textContent}`);
  }
});
```

Pada contoh tersebut, event listener tidak dipasang pada setiap elemen `<li>`. Event listener hanya dipasang pada elemen `<ul>`.

Ketika salah satu `<li>` diklik, event akan naik ke `<ul>` melalui event bubbling. JavaScript kemudian memeriksa apakah elemen yang diklik adalah `<li>` menggunakan `event.target`.

Event delegation bermanfaat ketika:

- Memiliki banyak elemen yang sama.
- Elemen baru dapat ditambahkan secara dinamis.
- Ingin mengurangi jumlah event listener.
- Membuat daftar item, tabel, menu, atau card yang interaktif.

## Kesimpulan Tambahan

Materi lanjutan DOM yang dipelajari adalah:

- `document.createElement()` digunakan untuk membuat elemen HTML baru.
- `appendChild()` digunakan untuk menambahkan elemen sebagai child dari elemen lain.
- `append()` digunakan untuk menambahkan elemen atau teks ke dalam sebuah elemen.
- `prepend()` digunakan untuk menambahkan elemen pada bagian awal parent element.
- `remove()` digunakan untuk menghapus elemen dari DOM.
- `addEventListener()` digunakan untuk menjalankan kode ketika event tertentu terjadi.
- Event `click` digunakan untuk mendeteksi klik pada elemen.
- Event `input` digunakan untuk mendeteksi perubahan nilai input secara langsung.
- Event `submit` digunakan untuk menangani pengiriman form.
- `event.preventDefault()` digunakan untuk mencegah perilaku bawaan browser, seperti reload saat form dikirim.
- Event bubbling adalah proses event yang bergerak dari elemen anak ke elemen parent.
- `event.stopPropagation()` digunakan untuk menghentikan event agar tidak diteruskan ke parent.
- Event delegation memanfaatkan event bubbling agar satu event listener dapat menangani banyak elemen.