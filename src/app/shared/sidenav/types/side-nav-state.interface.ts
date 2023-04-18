import { FolderInterface } from '../../types/folder.interface';

export interface SideNavStateInterface {
  isOpen: boolean;
  isLoading: boolean;
  folders: string[];
}
