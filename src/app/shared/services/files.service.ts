import { Injectable } from '@angular/core';
import { readdir, readdirSync, stat, statSync } from 'fs';
import * as os from 'os';
import { resolve } from 'path';
import { Subject } from 'rxjs';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  currentPath: string;
  entries = new Subject<string[]>();
  showHidden: boolean = false;

  constructor() {}

  public setShowHidden(value: boolean) {
    this.showHidden = value;
    this.updateEntries();
  }

  public navigate(folder: string) {
    const homeDir = os.homedir();
    this.currentPath = resolve(homeDir, folder);
    this.updateEntries();
  }

  public getHomeFolders(): string[] {
    const homeDir = os.homedir();
    this.currentPath = homeDir;

    return readdirSync(homeDir).filter((f) => !f.includes('.'));
  }

  public getFolders() {
    return readdirSync(this.currentPath).filter((f) => f.at(0) !== '.');
  }

  public changeDir(folder: string): void {
    const targetPath = resolve(this.currentPath, folder);

    stat(targetPath, (err, stats) => {
      if (err) {
        console.error(err);
      }
      if (stats.isFile()) {
        //this.openFile(targetPath);
      } else if (stats.isDirectory()) {
        this.currentPath = targetPath;
        this.updateEntries();
      } else {
        console.error(new Error(`Unknown file system object: ${targetPath}`));
      }
    });
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
}
