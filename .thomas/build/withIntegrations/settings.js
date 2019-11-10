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

  const integrationSlug = path.basename(integrationDir);
  const otherSettingsPages = {};
  files.forEach(f => {
    const settingsPageFile = path.parse(f).name.replace('.tsx', '');
    otherSettingsPages[settingsPageFile] = {
      integrationSlug,
      settingsPageSlug: settingsPageFile,
      isIndex: settingsPageFile === 'index',
      isNew: settingsPageFile === 'new',
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
  console.log(settings);
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

    // Needs to have an index file
    returnObj.hasIndex = !!Object.values(setting).find(s => s.isIndex);

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

  console.log(integrations.map(getIntegrationSettings).filter(i => i !== null));

  const template = getIntegrationSettingsTemplate();
  const settingsAsArray = integrationSettingsToArray(settings);

  console.log('SAA', settingsAsArray);

  writeTemplateToFile(template, { settings: settingsAsArray }, 'integrationSettings.tsx');
};

module.exports = {
  getSettings
};
