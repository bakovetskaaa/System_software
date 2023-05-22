import { Component, OnInit } from '@angular/core';
import { RecentPreviewInterface } from '../types/recentPreview.interface';
import { FilesService } from '../../shared/services/files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-preview',
  templateUrl: './recent-preview.component.html',
  styleUrls: ['./recent-preview.component.scss'],
})
export class RecentPreviewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'modified', 'extension'];
  dataSource: RecentPreviewInterface[] = [];

  constructor(private filesService: FilesService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = this.filesService.getRecentData();
    console.log(this.dataSource);
  }

  onDirClick(folder: string): void {
    if (this.filesService.getStat(folder).isDirectory()) {
      this.filesService.currentPath = folder;
      this.router.navigateByUrl('/detail');
    } else {
      this.filesService.openFile(folder);
    }
  }

  getType(name) {
    if (this.filesService.getStat(name).isDirectory()) {
      return 'folder';
    } else {
      return 'text_snippet';
    }
  }
}
