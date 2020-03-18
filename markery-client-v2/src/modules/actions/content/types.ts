import { Folder } from '../../../lib/api/folders/types';
import { Url } from '../../../lib/api/urls/types';

export interface ContentState {
  rootFolderId: string | null;
  currentFolder: Folder | null;
  folders: Folder[] | null;
  urls: Url[] | null;
}

// TODO: any way for typesafe actions?
export interface ContentAction {
  type: string;
  payload?: any;
}
