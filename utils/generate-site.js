const fs = require('fs');
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./dist/index.html', fileContent, err => {
        if (err) {
            reject(err);
            return;
        }
        resolve({
            ok: true,
            message: 'File created!'
        });
      });
    });
  };

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist', err => {
            if (err) {
                reject(err);
                return
            }
            resolve({
                ok: true,
                message: 'file copied!'
            });
        });
    });
};

// this is the shortcut for the one underneath it
module.exports = { writeFile, copyFile };
// module.exports = {
//     writeFile: writeFile,
//     copyFile: copyFile
//   };