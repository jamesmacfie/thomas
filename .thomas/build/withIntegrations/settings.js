const fs = require('fs');
const path = require('path');
const { writeTemplateToFile } = require('./template');
const { getDirs, getNamedFilesOrFolderIndex } = require('./dirs');

const getIntegrationSettingsTemplate = () => {
  const source = path.join(__dirname, `integrationSettingsTemplate.handlebars`);
  return fs.readFileSync(source, 'utf8');
};

const getIntegrationSettings = integrationDir => {
  const source = path.join(integrationDir, `settings`);
  if (!fs.existsSync(source)) {
    return null;
  }

  const { files, folders } = getNamedFilesOrFolderIndex(source, true);

  // Requires an index file for the main settings page
  const hasIndexFile = files.find(f => f.endsWith('index.tsx'));
  if (!hasIndexFile) {
    return null;
  }

  const integrationSlug = path.basename(integrationDir);
  const otherSettingsPages = {};
  files.forEach(f => {
    const settingsPageFile = path.parse(f).name.replace('.tsx', '');
    if (settingsPageFile === 'index') {
      return;
    }

    otherSettingsPages[settingsPageFile] = {
      integrationSlug,
      settingsPageSlug: settingsPageFile,
      widgetImportName: `${integrationSlug.charAt(0).toUpperCase()}${integrationSlug.slice(1)}_${settingsPageFile}`
    };
  });

  folders.forEach(f => {
    const folderParts = f.split('/');
    const settingsPageFolder = folderParts[folderParts.length - 2];
    otherSettingsPages[settingsPageFolder] = {
      integrationSlug,
      settingsPageSlug: settingsPageFolder,
      widgetImportName: `${integrationSlug.charAt(0).toUpperCase()}${integrationSlug.slice(1)}_${settingsPageFolder}`
    };
  });

  return {
    [integrationSlug]: otherSettingsPages
  };
};

const integrationSettingsToArray = settings => {
  return Object.keys(settings).map(key => {
    const setting = settings[key];
    const returnObj = {
      integrationSlug: key,
      widgetImportName: `${key.charAt(0).toUpperCase()}${key.slice(1)}_settings`
    };

    if (Object.keys(setting).length) {
      returnObj.hasChildren = true;
      returnObj.children = Object.values(setting);
    } else {
      returnObj.hasChildren = false;
    }

    return returnObj;
  });
};

const getSettings = () => {
  const source = path.join(__dirname, '../../../integrations');
  const integrations = getDirs(source);
  const settings = integrations
    .map(getIntegrationSettings)
    .filter(i => i !== null)
    .reduce((acc, val) => Object.assign(acc, val), {});

  const template = getIntegrationSettingsTemplate();
  const settingsAsArray = integrationSettingsToArray(settings);

  writeTemplateToFile(template, { settings: settingsAsArray }, 'integrationSettings.tsx');
};

module.exports = {
  getSettings
};
