const fs = require('fs');
const path = require('path');
const { writeTemplateToFile } = require('./template');
const { getDirs, getNamedFilesOrFolderIndex } = require('./dirs');

const getIntegrationWidgetTemplate = () => {
  const source = path.join(__dirname, `integrationWidgetTemplate.handlebars`);
  return fs.readFileSync(source, 'utf8');
};

const getIntegrationWidgets = integrationDir => {
  const source = path.join(integrationDir, `widgets`);
  if (!fs.existsSync(source)) {
    return null;
  }

  const integrationSlug = path.basename(integrationDir);
  const { files, folders } = getNamedFilesOrFolderIndex(source);
  const fileWidgets = files.map(f => {
    const widgetSlug = path.parse(f).name;
    // Ignore files that start with an underscore
    if (widgetSlug.indexOf('_') === 0) {
      return null;
    }

    return {
      integrationSlug,
      widgetSlug,
      widgetImportName: `${integrationSlug.charAt(0).toUpperCase()}${integrationSlug.slice(1)}_${widgetSlug}`
    };
  });

  const folderWidgets = folders.map(f => {
    const folderParts = f.split('/');
    const widgetSlug = folderParts[folderParts.length - 2];

    // Ignore folders that start with an underscore
    if (widgetSlug.indexOf('_') === 0) {
      return null;
    }

    return {
      integrationSlug,
      widgetSlug,
      widgetImportName: `${integrationSlug.charAt(0).toUpperCase()}${integrationSlug.slice(1)}_${widgetSlug}`
    };
  });

  // TODO - some of this filter/null stuff can be cleaned up a bit
  return fileWidgets.filter(i => i !== null).concat(folderWidgets.filter(i => i !== null));
};

const getWidgets = () => {
  console.log('Thomas - transpiling widgets');
  const source = path.join(__dirname, '../../src/integrations');
  const integrations = getDirs(source);
  const widgets = integrations
    .map(getIntegrationWidgets)
    .filter(i => i !== null)
    .reduce((acc, val) => acc.concat(val), []);

  const template = getIntegrationWidgetTemplate();
  writeTemplateToFile(template, { widgets }, 'integrationWidgets.tsx');
};

module.exports = {
  getWidgets
};
