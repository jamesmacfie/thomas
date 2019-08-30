const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, `../../.thomas`);
const handlebars = require('handlebars');

const writeTemplateToFile = (template, data, filename) => {
  const outputFile = path.join(source, filename);
  if (!fs.existsSync(source)) {
    fs.mkdirSync(source);
  }

  const compiledTemplate = handlebars.compile(template);
  const templateResult = compiledTemplate(data);
  fs.writeFileSync(outputFile, templateResult);
};

module.exports = {
  writeTemplateToFile
};
