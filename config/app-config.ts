import path from 'path';
import * as fs from 'fs';
import * as yaml from 'yaml';
import { Config } from './configsTypes';

const scriptDirectory = path.dirname(__filename);

// Define the configuration file based on the operating environment
export const environment = process.env.NODE_ENV || 'development';
const configFileName =
    environment === 'production' ? 'production' : 'development';

// Build the path to the relative configuration file
const configFile = fs.readFileSync(
    path.join(scriptDirectory, `./${configFileName}.yaml`),
    'utf8',
);

const config: Config = yaml.parse(configFile);

export default config;
