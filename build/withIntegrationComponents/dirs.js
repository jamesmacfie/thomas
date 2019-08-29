const fs = require('fs');
const path = require('path');

const getDirs = source => {
  if (!fs.existsSync(source)) {
    throw new Error(`Folder ${folder} does not exist`);
  }

  return fs
    .readdirSync(source)
    .map(f => path.join(source, f))
    .filter(p => fs.statSync(p).isDirectory());
};

const getNamedFilesOrFolderIndex = source => {
  if (!fs.existsSync(source)) {
    throw new Error(`Folder ${folder} does not exist`);
  }

  const fileFolders = fs.readdirSync(source).map(f => path.join(source, f));
  const files = fileFolders.filter(p => fs.statSync(p).isFile()).filter(p => p.indexOf('index') === -1);
  const folders = fileFolders
    .filter(p => fs.statSync(p).isDirectory())
    .map(d => {
      // Does this directory have an index file? If so, use that. Else return null
      const indexFile = path.join(d, 'index.tsx');
      if (!fs.existsSync(indexFile)) {
        return null;
      }
      return indexFile;
    })
    .filter(d => d !== null)
    .reduce((acc, val) => acc.concat(val), []);

  return { files, folders };
};

module.exports = {
  getDirs,
  getNamedFilesOrFolderIndex
};
