// The "database". Swap this file for Mongo/Firestore/SQL; nothing else changes.
import { readFile, writeFile } from 'node:fs/promises';
const FILE = new URL('../../../data/portfolio.json', import.meta.url);
export const portfolioRepository = {
  async getPublished() { return JSON.parse(await readFile(FILE, 'utf8')).published; },
  async savePublished(portfolio) { await writeFile(FILE,
      JSON.stringify({ published: portfolio }, null, 2)); },
};
