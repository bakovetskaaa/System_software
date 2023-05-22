import { Injectable } from '@angular/core';
import {
  Stats,
  cpSync,
  existsSync,
  mkdirSync,
  readdir,
  readdirSync,
  rmSync,
  stat,
  statSync,
  writeFileSync,
} from 'fs';
import { copySync, moveSync } from 'fs-extra';
import * as os from 'os';
import { resolve } from 'path';
import { Subject } from 'rxjs';
import { PersistenceService } from './persistence.service';
import { RecentPreviewInterface } from '../../home/types/recentPreview.interface';
import { shell } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  currentPath: string;
  entries = new Subject<string[]>();
  showHidden: boolean = false;
  propertiesName: string = 'Test';
  properties: Stats;
  copyFilePath: string;
  isCutMode: boolean;
  favorited: string[] = [];
  recent: string[] = [];

  constructor() {}

  public setShowHidden(value: boolean) {
    this.showHidden = value;
    this.updateEntries();
  }

  public navigate(folder: string) {
    const homeDir = os.homedir();
    this.currentPath = resolve(homeDir, folder);
    this.updateEntries();
    this.setRecent(this.currentPath);
  }

  public getHomeFolders(): string[] {
    const homeDir = os.homedir();
    this.currentPath = homeDir;

    return readdirSync(homeDir).filter((f) => !f.includes('.'));
  }

  public getFolders() {
    return readdirSync(this.currentPath).filter((f) => f.at(0) !== '.');
  }

  public createFolder(name: string) {
    const filePath = resolve(this.currentPath, name);
    if (!existsSync(filePath)) {
      mkdirSync(filePath);
    }

    this.updateEntries();
  }
  catch(err) {
    console.error(err);
  }

  public createFile(name: string) {
    const filePath = resolve(this.currentPath, name);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, '');
    }

    this.updateEntries();
  }

  public changeDir(folder: string): void {
    const targetPath = resolve(this.currentPath, folder);

    this.setRecent(targetPath);

    stat(targetPath, (err, stats) => {
      if (err) {
        console.error(err);
      }
      if (stats.isFile()) {
        this.openFile(targetPath);
      } else if (stats.isDirectory()) {
        this.currentPath = targetPath;
        this.updateEntries();
      } else {
        console.error(new Error(`Unknown file system object: ${targetPath}`));
      }
    });
  }

  public deleteFile(name: string) {
    const filePath = resolve(this.currentPath, name);
    if (existsSync(filePath)) {
      rmSync(filePath, { recursive: true, force: false });
    }

    this.updateEntries();
  }

  public getProperties(name: string) {
    const filePath = resolve(this.currentPath, name);
    if (existsSync(filePath)) {
      this.properties = statSync(filePath);
    }

    this.updateEntries();
  }

  public copyFile(name: string): void {
    this.isCutMode = false;
    const filePath = resolve(this.currentPath, name);

    this.copyFilePath = filePath;
    console.log(this.copyFilePath);
  }

  public cutFile(name: string): void {
    this.copyFile(name);
    this.isCutMode = true;
  }

  public pasteFile(): void {
    let fileName = '/' + this.copyFilePath.split('/').at(-1);

    if (this.isCutMode) {
      if (this.copyFilePath !== this.currentPath + fileName)
        moveSync(this.copyFilePath, this.currentPath + fileName);
    } else {
      if (existsSync(this.currentPath + fileName)) {
        let parts: string[] = fileName.split('.');

        if (parts.length > 1) {
          parts[parts.length - 2] += '_copy.';
        } else {
          parts[0] += '_copy';
        }

        copySync(this.copyFilePath, this.currentPath + parts.join(''));
      } else {
        copySync(this.copyFilePath, this.currentPath + fileName);
      }
    }

    this.updateEntries();
  }

  public favorite(name): void {
    const filePath = resolve(this.currentPath, name);

    if (this.favorited.includes(filePath)) {
       this.favorited.splice(
        this.favorited.indexOf(filePath),
        1
      );
    } else {
      this.favorited.push(filePath);
    }

    PersistenceService.set('fauvorite', this.favorited);
  }

  public getRecentData(): RecentPreviewInterface[] {
    let data: RecentPreviewInterface[] = [];

    for (let path of this.recent) {
      let name = path.split('/').at(-1);
      let parts = name.split('.');
      let modified = statSync(path).mtime;

      let tempData: RecentPreviewInterface = {
        name: path,
        modified: modified,
        extension: parts.length === 1 ? 'folder' : parts.at(-1),
      };

      data.push(tempData);
    }

    return data.slice(0, data.length >= 5 ? 5 : data.length);
  }

  public getStat(path: string): Stats {
    return statSync(path);
  }

  public openFile(path: string) {
    shell.openPath(path);
  }

  private updateEntries() {
    readdir(this.currentPath, (err: Error, files: [string]) => {
      if (err) {
        console.error(err);
      }
      console.log(this.currentPath);
      let result = this.showHidden
        ? files
        : files.filter((f) => f.charAt(0) !== '.');
      this.entries.next(['../'].concat(result));
    });
  }

  private setRecent(targetPath: string) {
    if (this.recent.includes(targetPath)) {
      this.recent.splice(this.recent.indexOf(targetPath), 1);
    }

    if (this.recent.length >= 30) {
      this.recent.pop();
    }
    this.recent = [targetPath, ...this.recent];
    PersistenceService.set('recent', this.recent);
  }
}
