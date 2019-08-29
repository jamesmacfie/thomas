const fs = require('fs');
const path = require('path');
const { writeTemplateToFile } = require('./template');

const getIntegrationComponentTemplate = () => {
  const source = path.join(__dirname, `integrationComponentTemplate.handlebars`);
  return fs.readFileSync(source, 'utf8');
};

const getIntegrationDirs = () => {
  const source = path.join(__dirname, `../../integrations`);
  return fs
    .readdirSync(source)
    .map(f => path.join(source, f))
    .filter(p => fs.statSync(p).isDirectory());
};

const getIntegrationComponents = integrationDir => {
  const source = path.join(integrationDir, `components`);
  if (!fs.existsSync(source)) {
    return null;
  }

  return fs
    .readdirSync(source)
    .map(f => path.join(source, f))
    .filter(p => fs.statSync(p).isFile())
    .filter(p => p.indexOf('index') === -1)
    .map(p => {
      const integrationSlug = path.basename(integrationDir);
      const componentSlug = path.parse(p).name;
      return {
        integrationSlug,
        componentSlug,
        componentImportName: `${integrationSlug.charAt(0).toUpperCase()}${integrationSlug.slice(1)}_${componentSlug}`
      };
    })
    .reduce((acc, val) => acc.concat(val), []);
};

const getComponents = () => {
  const integrations = getIntegrationDirs();
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
