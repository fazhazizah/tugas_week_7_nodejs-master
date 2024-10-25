const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to format file size into KB/MB
const formatSize = (size) => {
  if (size >= 1000000) {
    return (size / 1000000).toFixed(2) + ' MB';
  } else if (size >= 1000) {
    return (size / 1000).toFixed(2) + ' KB';
  } else {
    return size + ' bytes';
  }
};

// Function to create a folder
const makeFolder = () => {
  rl.question('Masukan Nama Folder: ', (folderName) => {
    const folderPath = path.join(__dirname, folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdir(folderPath, (err) => {
        if (err) throw err;
        console.log(`Folder ${folderName} berhasil dibuat!`);
      });
    } else {
      console.log(`Folder ${folderName} sudah ada.`);
    }
    rl.close();
  });
};

// Function to create a file and place it in the appropriate folder
const makeFile = () => {
  const rootDir = __dirname;

  // Membaca semua folder di direktori root
  fs.readdir(rootDir, (err, items) => {
    if (err) throw err;

    // Filter hanya folder
    const folders = items.filter((item) => fs.statSync(path.join(rootDir, item)).isDirectory());

    if (folders.length === 0) {
      console.log('Tidak ada folder yang tersedia.');
      rl.close();
      return;
    }

    // Minta pengguna memasukkan nama folder
    rl.question('Masukkan Nama Folder untuk membuat file: ', (folderName) => {
      const selectedFolder = folderName.toLowerCase();
      const targetFolder = path.join(rootDir, selectedFolder);

      // Cek apakah folder tersebut ada
      if (!fs.existsSync(targetFolder)) {
        console.log(`Folder ${selectedFolder} tidak ditemukan.`);
        rl.close();
        return;
      }

      // Jika folder ada, minta nama file
      rl.question('Masukkan Nama File : ', (fileName) => {
        const filePath = path.join(targetFolder, fileName);

        // Membuat file di folder yang dipilih
        fs.writeFile(filePath, '', (err) => {
          if (err) throw err;
          console.log(`File ${fileName} berhasil dibuat di folder ${selectedFolder}!`);
          rl.close();
        });
      });
    });
  });
};

// Function to move files based on their extensions into "image" or "text" folders
const extSorter = () => {
  const folderPath = path.join(__dirname, 'unorganize_folder');
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const ext = path.extname(file).slice(1).toLowerCase();
      let targetFolder;

      if (['jpg', 'jpeg', 'png'].includes(ext)) {
        targetFolder = path.join(__dirname, 'image');
      } else if (['txt', 'md'].includes(ext)) {
        targetFolder = path.join(__dirname, 'text');
      } else {
        console.log(`File ${file} tidak termasuk jenis image atau text, dilewati.`);
        return;
      }

      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
      }

      const oldPath = path.join(folderPath, file);
      const newPath = path.join(targetFolder, file);

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log(`File ${file} berhasil dipindahkan ke folder ${path.basename(targetFolder)}`);
      });
    });
  });
};

// Function to read folder contents in the desired format
const readFolder = () => {
  rl.question('Masukan Nama Folder: ', (folderName) => {
    const folderPath = path.join(__dirname, folderName);
    fs.readdir(folderPath, (err, files) => {
      if (err) throw err;

      const fileDetails = files.map((file) => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);

        // Format date to 'YYYY-MM-DD'
        const formattedDate = `${stats.birthtime.getFullYear()}-${String(stats.birthtime.getMonth() + 1).padStart(2, '0')}-${String(stats.birthtime.getDate()).padStart(2, '0')}`;

        // Determine file type based on extension
        const ext = path.extname(file).slice(1).toLowerCase();
        let jenisFile = 'lainnya';

        if (['jpg', 'png', 'jpeg'].includes(ext)) {
          jenisFile = 'gambar';
        } else if (['txt', 'md'].includes(ext)) {
          jenisFile = 'text';
        }

        return {
          namaFile: file,
          extensi: ext,
          jenisFile: jenisFile,
          tanggalDibuat: formattedDate,
          ukuranFile: formatSize(stats.size),
        };
      });

      console.log(`Berhasil menampilkan isi dari folder ${folderName}:`, fileDetails);
      rl.close();
    });
  });
};

// Function to read a text file from any folder within the project
const readFile = () => {
  rl.question('Masukkan nama file yang ingin dibaca : ', (fileName) => {
    // Mencari file di seluruh folder dan subfolder
    const findFile = (dir) => {
      return new Promise((resolve, reject) => {
        fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
          if (err) return reject(err);

          const promises = entries.map((entry) => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
              // Jika direktori, cari file di dalamnya
              return findFile(fullPath);
            } else {
              // Jika file, cek ekstensi
              const ext = path.extname(entry.name).toLowerCase();
              if (entry.name === fileName && ['.txt', '.md'].includes(ext)) {
                // Temukan file
                return Promise.resolve(fullPath);
              }
            }
            return Promise.resolve(null);
          });

          Promise.all(promises)
            .then((results) => {
              // Filter dan ambil hanya yang tidak null
              const foundFiles = results.filter((file) => file !== null);
              if (foundFiles.length > 0) {
                resolve(foundFiles[0]); // Kembalikan file pertama yang ditemukan
              } else {
                resolve(null); // Tidak ditemukan
              }
            })
            .catch(reject);
        });
      });
    };

    findFile(__dirname)
      .then((filePath) => {
        if (filePath) {
          // Baca dan tampilkan isi file
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(`\nIsi file ${fileName}:\n`);
            console.log(data);
            rl.close();
          });
        } else {
          console.log(`File ${fileName} tidak ditemukan di dalam proyek.`);
          rl.close();
        }
      })
      .catch((err) => {
        console.error('Terjadi kesalahan:', err);
        rl.close();
      });
  });
};


// Export all functions to be used in index.js
module.exports = {
  makeFolder,
  makeFile,
  extSorter,
  readFolder,
  readFile,
};
