import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FilesComponent implements OnInit {
  entries: string[] = [];

  constructor(
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

  onDirClick(folder: string): void {
    this.folderService.changeDir(folder);
  }

  trackItem(index, entry) {
    return this.entries ? this.entries : undefined;
  }
}
