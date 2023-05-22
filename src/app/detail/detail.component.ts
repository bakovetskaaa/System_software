import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilesService } from '../shared/services/files.service';

export interface DialogData {
  name: string;
  type: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {});
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  name: string;
  type: string = 'Folder';

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private fileService: FilesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onCreateClick() {
    if (this.type === 'Folder') {
      this.fileService.createFolder(this.name);
    } else {
      this.fileService.createFile(this.name);
    }

    this.onNoClick();
  }
}
