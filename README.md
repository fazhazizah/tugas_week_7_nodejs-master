# Tugas Week 7 Nodejs

### Deskripsi Tugas
Sebagai seorang Nodejs developer kamu diminta untuk membuat sebuah aplikasi berbasis CLI yang digunakan untuk keperluan manajemen file system.Aplikasi ini akan digunakan untuk menata ulang dan merapikan sebuah folder.Aplikasi ini mempunyai beberapa fitur utama diantaranya : 

* fitur untuk membaca sebuah isi folder dan menampilkan detail isi folder tersebut berurutan sesuai tanggal pembuatanya.
* fitur untuk membuat sebuah folder baru.
* fitur untuk membuat sebuah file baru.
* fitur untuk merapikan file kedalam folder berdasarkan ekstensi.
* fitur untuk membaca isi dari sebuah file hanya mendukung untuk membaca sebuah text bukan gambar

### Daftar Perintah / Command Line
berikut adalah ketentuan untuk menjalankan perintah.Silahkan edit pada bagian `package.json`

* **make-folder** : digunakan untuk membuat folder
* **make-file** : digunakan untuk membuat sebuah file
* **ext-sorter** : merapikan sebuah folder sesuai dengan extensi.
* **read-folder** : digunakan untuk membaca sebuah folder.
* **read-file** : digunakan untuk membaca isi dari sebuah file.

semua perintah dijalankan dengan menggunakan perintah `npm run ${nama_command}`

### Ketentuan Penilaian 
* Untuk fitur `make-folder` program dapat membuat sebuah folder 
* Ketika menjalankan `make-file` program dapat membuat sebuah file baru berdasarkan extensi yang ingin dibuat
* Disediakan sebuah folder bernama `unorganize_folder` didalam folder tersebut terdapat beberapa contoh extensi file yang berbeda, rapikan file tersebut dan bagi kedalam beberapa folder diluar folder `unorganize_folder`.ketika command `ext-sorter` dijalankan semua file yang ada pada folder `unorganize_folder` akan berpindah kedalam folder yang sesuai dengan extensi nya seperti folder `image` berisi sebuah gambar dan folder `text` berisi sebuah file text.
* Ketika command `read-folder` dijalankan maka akan muncul semua list file yang ada pada folder yang dipilih.Misalnya kalian ingin mengetahui isi file yang ada pada folder `image` silahkan jalankan perintah `read-folder`.untuk ketentuan outputnya sebagai berikut :

```json
// menampilkan isi dari folder nama_folder
berhasil menampilkan isi dari folder coba :
[ 
    {
        namaFile : "gambar.jpg",
        extensi : "jpg",
        jenisFile : "gambar",
        tanggalDibuat : 2024-10-12
        ukuranFile : "1mb"
    },
    {
        namaFile : "text.txt",
        extensi : "txt",
        jenisFile : "text",
        tanggalDibuat : 2024-10-12
        ukuranFile : "10kb"
    }

]
```

* Ketika `read-file` dijalankan maka akan muncul isi dari file tersebut sebagai berikut : 
```txt
isi dari file cerpen.txt 

Di suatu desa kecil yang dikelilingi oleh hutan lebat, hiduplah seorang pemuda bernama Arman yang memiliki rasa ingin tahu tak terbatas tentang alam. Setiap pagi, ia menjelajah ke dalam hutan untuk mencari tanaman langka dan hewan-hewan yang jarang terlihat. Suatu hari, di dalam keheningan hutan, Arman menemukan sebuah gua tersembunyi yang belum pernah ia lihat sebelumnya. Dengan hati-hati, ia masuk ke dalam dan terkejut saat melihat dinding-dinding gua dipenuhi dengan lukisan kuno yang menggambarkan makhluk-makhluk aneh dan kejadian misterius. Ia menyadari bahwa gua ini mungkin menyimpan rahasia masa lalu yang hilang, dan sejak saat itu, hidup Arman berubah menjadi petualangan untuk mengungkap makna dari setiap gambar yang ia temukan.
 
```

### Ketentuan Pengumpulan 
* buatlah sebuah branch baru bernama `result` untuk menampung semua output dan hasil kerja kalian beserta screenshot hasil dari program 
* untuk branch `master` digunakan untuk menyimpan hasil pengerjaan tanpa menyimpan output atau hasil program yang sudah berhasil dijalankan.