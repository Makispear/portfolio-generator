// FILE SYSTEM 
const fs = require('fs');

// WRITE FILE PROMISE 
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

// COPY FILE PROMISE 
const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', 'dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File copied'
            });
        });
    });
};


module.exports = { writeFile, copyFile };
// SHORTCUT FOR THE FOLLOWING:
        // module.exports = {
        //     writeFile: writeFile,
        //     copyFile: copyFile
        //   };