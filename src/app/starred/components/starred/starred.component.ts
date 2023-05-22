import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { FilesService } from '../../../shared/services/files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.scss'],
})
export class StarredComponent {
  menuTopLeftPosition = { x: '0', y: '0' };
  entries: string[] = [];

  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;

  constructor(
    public dialog: MatDialog,
    private folderService: FilesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.entries = this.folderService.favorited;
  }

  onDirClick(folder: string): void {
    if (this.folderService.getStat(folder).isDirectory()) {
      this.folderService.currentPath = folder;
      this.router.navigateByUrl('/detail');
    } else {
      this.folderService.openFile(folder);
    }
  }

  getType(name) {
    if (this.folderService.getStat(name).isDirectory()) {
      return 'assets/img/folder.svg';
    } else {
      return 'assets/img/file.png';
    }
  }
}
