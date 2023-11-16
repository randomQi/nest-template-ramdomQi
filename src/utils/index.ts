import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
const FileName = 'config.yaml';
const config_path = join(__dirname, '../..', `config/${FileName}`);

export function Configuration() {
  return yaml.load(readFileSync(config_path, 'utf-8'));
}
