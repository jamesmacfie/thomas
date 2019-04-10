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
    jsonFile[key] = value;
    await writeFile(filepath, JSON.stringify(jsonFile));
  }
};

export default storage;
