const app = require("./app");
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "make-folder":
    app.makeFolder();
    break;
  case "make-file":
    app.makeFile();
    break;
  case "read-folder":
    app.readFolder();
    break;
  case "read-file":
    app.readFile();
    break;
  case "ext-sorter":
    app.extSorter();
    break;
  default:
    console.error("Perintah tidak valid!");
}