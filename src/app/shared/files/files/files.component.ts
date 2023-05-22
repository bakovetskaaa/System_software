import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FilesService } from '../../services/files.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { DialogInterface } from '../../types/dialog.interface';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Stats } from 'fs';
import { resolve } from 'path';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FilesComponent implements OnInit {
  menuTopLeftPosition = { x: '0', y: '0' };
  entries: string[] = [];

  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;

  constructor(
    public dialog: MatDialog,
    private folderService: FilesService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.folderService.changeDir('');
    this.folderService.entries.subscribe((files: string[]) => {
      this.entries = [];
      this.entries = files;
      this.changeDetection.detectChanges();
      console.log(this.entries);
    });
  }

  onSingleClick() {
    this.matMenuTrigger.closeMenu();
  }

  onDirClick(folder: string): void {
    this.folderService.changeDir(folder);
  }

  trackItem(index, entry) {
    return this.entries ? this.entries : undefined;
  }

  onRightClick(event: MouseEvent, item: string) {
    event.preventDefault();

    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    this.matMenuTrigger.menuData = { item: item };

    this.matMenuTrigger.openMenu();
  }

  onDelete(name: string) {
    this.folderService.deleteFile(name);
  }

  onProperties(name: string) {
    this.folderService.propertiesName = name;
    this.folderService.getProperties(name);
    let myData: DialogInterface = {
      name: name,
    };

    const dialogRef = this.dialog.open(PropertiesComponent, {
      data: myData,
    });
  }

  onCopy(name: string) {
    this.folderService.copyFile(name);
  }

  onCut(name: string) {
    this.folderService.cutFile(name);
  }

  onPaste() {
    this.folderService.pasteFile();
  }

  onFavorite(name: string) {
    this.folderService.favorite(name);
  }

  getType(name) {
    if (
      this.folderService
        .getStat(resolve(this.folderService.currentPath, name))
        .isDirectory()
    ) {
      return 'assets/img/folder.svg';
    } else {
      return 'assets/img/file.png';
    }
  }
}

@Component({
  selector: 'app-properties',
  templateUrl: '../properties/properties.component.html',
})
export class PropertiesComponent {
  name: string = '';
  properties: Stats;
  path: string = '';

  constructor(
    public dialogRef: MatDialogRef<PropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInterface,
    private fileService: FilesService
  ) {
    this.name = fileService.propertiesName;
    this.properties = this.fileService.properties;
    this.path = fileService.currentPath;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
