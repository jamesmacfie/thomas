const fs = require('fs');
const path = require('path');
const { writeTemplateToFile } = require('./template');
const { getDirs, getNamedFilesOrFolderIndex } = require('./dirs');

const getIntegrationComponentTemplate = () => {
  const source = path.join(__dirname, `integrationComponentTemplate.handlebars`);
  return fs.readFileSync(source, 'utf8');
};

const getIntegrationComponents = integrationDir => {
  const source = path.join(integrationDir, `components`);
  if (!fs.existsSync(source)) {
    return null;
  }

  const integrationSlug = path.basename(integrationDir);
  const { files, folders } = getNamedFilesOrFolderIndex(source);
  const fileComponents = files.map(f => {
    const componentSlug = path.parse(f).name;
    return {
      integrationSlug,
      componentSlug,
      componentImportName: `${integrationSlug.charAt(0).toUpperCase()}${integrationSlug.slice(1)}_${componentSlug}`
    };
  });

  const folderComponents = folders.map(f => {
    const folderParts = f.split('/');
    const componentSlug = folderParts[folderParts.length - 2];
    return {
      integrationSlug,
      componentSlug,
      componentImportName: `${integrationSlug.charAt(0).toUpperCase()}${integrationSlug.slice(1)}_${componentSlug}`
    };
  });

  return fileComponents.concat(folderComponents);
};

const getComponents = () => {
  const source = path.join(__dirname, '../../integrations');
  const integrations = getDirs(source);
  const components = integrations
    .map(getIntegrationComponents)
    .filter(i => i !== null)
    .reduce((acc, val) => acc.concat(val), []);

  const template = getIntegrationComponentTemplate();
  writeTemplateToFile(template, { components }, 'integrationComponents.tsx');
};

module.exports = {
  getComponents
};