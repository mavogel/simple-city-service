import {Config} from '../types';

let env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'simple-city-service',
  version: '1.0.0',
  port: 3000,
  env: 'dev'
};

if (env === 'production') {
  settings.env = 'prod';
  // other production settings
}