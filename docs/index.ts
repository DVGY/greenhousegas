import { basicInfo } from './basicInfo';
import { server } from './server';
import { tag } from './tags';
import { component } from './components';
import countries from './countries';

export = {
  ...basicInfo,
  ...server,
  ...tag,
  ...component,
  ...countries,
};
