import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../../shared/services/files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent implements OnInit {
  entries: string[];

  constructor(private folderService: FilesService, private router: Router) {}

  ngOnInit(): void {
    this.entries = this.folderService.recent;
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
