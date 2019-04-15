import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const filepath = 'data.json';

const storage = {
  get: async (key: string) => {
    const hasFile = await exists(filepath);
    if (!hasFile) {
      return null;
    }
    const file = await readFile(filepath, 'utf8');
    const jsonFile = JSON.parse(file);
    return jsonFile[key];
  },

  set: async (key: string, value: any) => {
    const hasFile = await exists(filepath);
    let jsonFile: any = {};
    if (hasFile) {
      const file = await readFile(filepath, 'utf8');
      jsonFile = JSON.parse(file);
    }
    const currentValue = jsonFile[key] || {};
    const newValue = Object.assign({}, currentValue, value);
    jsonFile[key] = newValue;
    await writeFile(filepath, JSON.stringify(jsonFile));
  },

  updateField: async (key: string, property: string, value: any) => {
    const currentValue = await storage.get(key);
    const newValue = Object.assign({}, currentValue, {
      [property]: value
    });
    await storage.set(key, newValue);
  }
};

export default storage;
